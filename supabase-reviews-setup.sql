-- ============================================================
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the reviews table
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

-- 5. Seed with some initial approved reviews (optional)
INSERT INTO reviews (name, location, rating, service, review_text, status) VALUES
  ('Priya Sharma',  'Mumbai',    5, 'sell-gold',    'Cashiogold gave me the best price for my old jewellery. The process was transparent and I got paid within minutes. Highly recommended!', 'approved'),
  ('Rajesh Kumar',  'Delhi NCR', 5, 'loan-release', 'Had pledged gold with an NBFC and was struggling to release it. Cashiogold handled everything — documentation, coordination — my gold was back in 48 hours!', 'approved'),
  ('Anita Patel',   'Ahmedabad', 5, 'sell-gold',    'The doorstep service was fantastic. They came home, tested professionally, offered a fair price, and transferred money within the hour. 10/10!', 'approved'),
  ('Suresh Nair',   'Chennai',   5, 'sell-gold',    'Cashiogold offered 7% more than local jewellers. Seeing the live gold rate on their calculator before visiting gave me confidence. Great experience!', 'approved'),
  ('Meena Joshi',   'Pune',      5, 'sell-gold',    'Fast, professional, and honest. I had old gold bars from my grandmother. The team valued them correctly and explained every step. Best rate in market!', 'approved'),
  ('Vikram Singh',  'Jaipur',    5, 'loan-release', 'Needed to release gold pledged with SBI urgently. Cashiogold sorted it in 24 hours — faster than expected. Professional, responsive, no hidden charges!', 'approved');

-- 6. Confirm setup
SELECT id, name, rating, status, created_at FROM reviews ORDER BY created_at DESC LIMIT 10;
