import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const urlSet = !!supabaseUrl && !supabaseUrl.includes("placeholder");
  const keySet = !!supabaseKey && !supabaseKey.includes("placeholder");

  // Test actual Supabase connection
  let dbReachable = false;
  let dbError = "";

  if (urlSet && keySet) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_leads?limit=0`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });
      dbReachable = res.ok || res.status === 200;
      if (!dbReachable) {
        const text = await res.text();
        dbError = `HTTP ${res.status}: ${text.slice(0, 120)}`;
      }
    } catch (e) {
      dbError = String(e).slice(0, 120);
    }
  }

  return NextResponse.json({
    env: {
      SUPABASE_URL: urlSet ? "✅ set" : "❌ missing",
      SUPABASE_ANON_KEY: keySet ? "✅ set" : "❌ missing",
    },
    db: dbReachable ? "✅ reachable" : `❌ ${dbError || "env vars missing"}`,
  });
}
