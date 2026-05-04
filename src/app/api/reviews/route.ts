import { NextRequest, NextResponse } from "next/server";

const URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ── GET: fetch approved reviews ──────────────────────────────
export async function GET() {
  try {
    const res = await fetch(
      `${URL}/rest/v1/reviews?status=eq.approved&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // cache 60s
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[reviews GET]", err);
      return NextResponse.json([], { status: 200 }); // return empty rather than error
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
    const body = await req.json();
    const { name, location, rating, service, review_text, honeypot } = body;

    // Spam check
    if (honeypot) return NextResponse.json({ success: true });

    // Validate
    if (!name?.trim() || !review_text?.trim() || !service) {
      return NextResponse.json({ error: "Name, service and review are required" }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
    }
    if (review_text.trim().length < 10) {
      return NextResponse.json({ error: "Review must be at least 10 characters" }, { status: 400 });
    }

    console.log("[REVIEW]", new Date().toISOString(), name, rating, "★");

    // Save to Supabase — use anon key so RLS INSERT policy applies
    const res = await fetch(`${URL}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: name.trim(),
        location: (location || "").trim(),
        rating: Number(rating),
        service,
        review_text: review_text.trim(),
        status: "pending", // admin must approve in Supabase dashboard
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[review POST]", err);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! It will appear after approval.",
    });
  } catch (e) {
    console.error("[review POST]", e);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
