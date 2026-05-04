import { NextRequest, NextResponse } from "next/server";

// Protected endpoint — requires secret token
// Usage: GET /api/health?token=YOUR_HEALTH_TOKEN
const HEALTH_TOKEN = process.env.HEALTH_CHECK_TOKEN;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!HEALTH_TOKEN || token !== HEALTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const urlSet = !!supabaseUrl && !supabaseUrl.includes("placeholder");
  const keySet = !!supabaseKey && !supabaseKey.includes("placeholder");

  let dbReachable = false;
  if (urlSet && keySet) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_leads?limit=0`, {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      });
      dbReachable = res.ok;
    } catch { /* unreachable */ }
  }

  return NextResponse.json({
    status: "ok",
    env: {
      SUPABASE_URL: urlSet ? "set" : "missing",
      SUPABASE_ANON_KEY: keySet ? "set" : "missing",
    },
    db: dbReachable ? "reachable" : "unreachable",
    timestamp: new Date().toISOString(),
  });
}
