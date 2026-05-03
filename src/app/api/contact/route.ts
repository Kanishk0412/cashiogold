import { NextRequest, NextResponse } from "next/server";

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
    const body: Payload = await req.json();

    // Honeypot spam check
    if (body.honeypot) return NextResponse.json({ success: true });

    // Validate required fields
    const required = ["name", "phone", "email", "city", "service", "message"] as const;
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }
    if (!/^[6-9]\d{9}$/.test(body.phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Always log to server console as a backup record
    console.log("[LEAD]", new Date().toISOString(), JSON.stringify({
      name: body.name, phone: body.phone, email: body.email,
      city: body.city, service: body.service,
    }));

    // Save to Supabase
    const result = await saveToSupabase(body);
    if (!result.ok) {
      console.error("[Supabase error]", result.error);
      // Still return success to the user — lead is logged above
    }

    // Sync to Google Sheets (fire-and-forget)
    sendToGoogleSheets(body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json({ error: "Server error. Please call us directly." }, { status: 500 });
  }
}
