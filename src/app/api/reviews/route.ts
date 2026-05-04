import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitize } from "@/lib/sanitize";

const URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const VALID_SERVICES = ["sell-gold", "loan-release", "doorstep", "general"];

// ── GET: fetch approved reviews ──────────────────────────────
export async function GET() {
  try {
    const res = await fetch(
      `${URL}/rest/v1/reviews?status=eq.approved&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("[reviews GET] HTTP", res.status);
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" },
    });
  } catch (e) {
    console.error("[reviews GET]", e);
    return NextResponse.json([], { status: 200 });
  }
}

// ── POST: submit a new review ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit: 3 reviews per minute per IP
    const ip = getClientIp(req);
    const { ok: allowed } = rateLimit(`review:${ip}`, 3);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { honeypot } = body;

    // Spam check
    if (honeypot) return NextResponse.json({ success: true });

    // Sanitize inputs
    const name        = sanitize(body.name        || "", 100);
    const location    = sanitize(body.location    || "", 100);
    const review_text = sanitize(body.review_text || "", 1000);
    const service     = sanitize(body.service     || "", 50);
    const rating      = Number(body.rating);

    // Validate
    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!review_text || review_text.length < 10) {
      return NextResponse.json({ error: "Review must be at least 10 characters." }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }
    if (!VALID_SERVICES.includes(service)) {
      return NextResponse.json({ error: "Invalid service selected." }, { status: 400 });
    }

    console.log("[REVIEW]", new Date().toISOString(), { name, rating });

    const res = await fetch(`${URL}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        location,
        rating,
        service,
        review_text,
        status: "pending",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[review POST]", err);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review will appear after approval.",
    });
  } catch (e) {
    console.error("[review POST]", e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
