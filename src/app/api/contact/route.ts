import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitize, sanitizePhone } from "@/lib/sanitize";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface Payload {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  honeypot?: string;
}

async function saveToSupabase(data: Payload): Promise<{ ok: boolean; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return { ok: false, error: "Supabase not configured" };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_KEY}`,
      apikey: SUPABASE_KEY,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name:    data.name,
      phone:   data.phone,
      email:   data.email,
      city:    data.city,
      service: data.service,
      message: data.message,
      status:  "new",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }
  return { ok: true };
}

async function sendToGoogleSheets(data: Payload) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), source: "website" }),
    });
  } catch { /* non-critical */ }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 submissions per minute per IP
    const ip = getClientIp(req);
    const { ok: allowed } = rateLimit(ip, 5);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body: Payload = await req.json();

    // Honeypot spam check
    if (body.honeypot) return NextResponse.json({ success: true });

    // Sanitize all inputs
    const name    = sanitize(body.name    || "", 100);
    const phone   = sanitizePhone(body.phone || "");
    const email   = sanitize(body.email   || "", 200);
    const city    = sanitize(body.city    || "", 100);
    const service = sanitize(body.service || "", 50);
    const message = sanitize(body.message || "", 2000);

    // Validate
    if (!name || !phone || !email || !city || !service || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!["sell-gold", "loan-release", "general"].includes(service)) {
      return NextResponse.json({ error: "Invalid service selected." }, { status: 400 });
    }

    // Log as backup record (server-side only)
    console.log("[LEAD]", new Date().toISOString(), { name, phone, city, service });

    const sanitized: Payload = { name, phone, email, city, service, message };

    // Save to Supabase
    const result = await saveToSupabase(sanitized);
    if (!result.ok) console.error("[Supabase error]", result.error);

    // Sync to Google Sheets (fire-and-forget)
    sendToGoogleSheets(sanitized);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json({ error: "Server error. Please call us directly." }, { status: 500 });
  }
}
