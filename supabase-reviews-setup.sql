-- ============================================================
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the reviews table (fresh — no seed data)
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT NOT NULL DEFAULT '',
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  service     TEXT NOT NULL,
  review_text TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to submit a review
CREATE POLICY "Anyone can submit review"
  ON reviews FOR INSERT TO anon
  WITH CHECK (true);

-- 4. Allow anyone to READ only approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews FOR SELECT TO anon
  USING (status = 'approved');

-- 5. Confirm setup (should return 0 rows — fresh start)
SELECT id, name, rating, status, created_at FROM reviews ORDER BY created_at DESC;
