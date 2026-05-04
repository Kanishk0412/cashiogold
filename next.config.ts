import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NEXT_PUBLIC_ vars are safe to embed — Supabase anon key is designed to be public
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://scdcpxbsitpqkcemzjnc.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZGNweGJzaXRwcWtjZW16am5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MjU1MTQsImV4cCI6MjA5MzQwMTUxNH0.-metrB5qMYpqPsMDi9DdNqhh4vv_3c8gMnajnGiO5_Y",
  },
};

export default nextConfig;
