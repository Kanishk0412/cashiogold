import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  honeypot?: string;
}

async function sendToGoogleSheets(data: ContactPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: "Website Contact Form",
      }),
    });
  } catch {
    // Non-critical — don't block the response
  }
}

async function saveToSupabase(data: ContactPayload) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_KEY}`,
      apikey: SUPABASE_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      service: data.service,
      message: data.message,
      status: "new",
      source: "website",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!body.name || !body.phone || !body.email || !body.city || !body.service || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(body.phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Save to Supabase (if configured)
    if (SUPABASE_URL && SUPABASE_KEY) {
      await saveToSupabase(body);
    }

    // Sync to Google Sheets (non-blocking)
    sendToGoogleSheets(body);

    return NextResponse.json(
      { success: true, message: "Your request has been submitted. We'll contact you soon!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
