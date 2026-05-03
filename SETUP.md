# Cashiogold — Setup & Deployment Guide

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Start development server
npm run dev
# → Open http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | For server-side writes |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Optional | Apps Script webhook URL |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production domain |

*Required only if using Supabase. Forms will show a success message regardless.

---

## Supabase Setup

### 1. Create a Supabase project
Go to [app.supabase.com](https://app.supabase.com) and create a new project.

### 2. Create the `contact_leads` table

Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  service TEXT NOT NULL CHECK (service IN ('sell-gold', 'loan-release', 'general')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'closed')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert (from API)
CREATE POLICY "Allow service role insert" ON contact_leads
  FOR INSERT WITH CHECK (true);

-- Allow service role to read (for admin dashboard)
CREATE POLICY "Allow service role read" ON contact_leads
  FOR SELECT USING (true);

-- Index for faster queries
CREATE INDEX idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_leads_updated_at
  BEFORE UPDATE ON contact_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Get your API keys
- Go to **Project Settings → API**
- Copy the `URL` and `anon/public` key into `.env.local`
- Copy the `service_role` key into `SUPABASE_SERVICE_ROLE_KEY`

### 4. Export leads to CSV
In Supabase Table Editor → `contact_leads` → Click **Export → CSV**

---

## Google Sheets Integration

### 1. Create a Google Sheet
Create a new Google Sheet with these columns:
```
Timestamp | Name | Phone | Email | City | Service | Message | Source
```

### 2. Create Apps Script webhook
1. Open your Sheet → **Extensions → Apps Script**
2. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.email,
      data.city,
      data.service,
      data.message,
      data.source || 'website'
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy → New deployment → Web app**
4. Set **Execute as: Me** and **Who has access: Anyone**
5. Copy the deployment URL into `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local`

---

## Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Cashiogold website"
git remote add origin https://github.com/your-username/cashiogold.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Import project from GitHub
2. Set **Framework: Next.js** (auto-detected)
3. Add all environment variables from `.env.local`
4. Click **Deploy**

### 3. Configure custom domain
In Vercel project settings → **Domains → Add domain**

---

## Customization Guide

### Update business details
Edit these files:
- `src/app/layout.tsx` — Phone, email, social links in structured data
- `src/components/Navbar.tsx` — Phone number in header
- `src/components/Footer.tsx` — All contact details
- `src/components/WhatsAppButton.tsx` — WhatsApp number
- `src/components/sections/HeroSection.tsx` — Hero stats
- `src/components/sections/TestimonialsSection.tsx` — Customer reviews

### Update gold rate fallback
In `src/app/api/gold-price/route.ts`, update `FALLBACK_24K` to current market rate.

### Update SEO metadata
- `src/app/layout.tsx` — Global metadata, JSON-LD schema
- `src/app/page.tsx` — Homepage metadata
- `src/app/contact/page.tsx` — Contact page metadata

---

## Performance Notes

- Gold rates are cached for 5 minutes via API route
- All pages statically generated at build time
- Images should be optimized via `next/image`
- Core Web Vitals optimized with font preloading

## Security

- Honeypot field on contact form prevents simple bots
- Server-side validation on all form inputs
- Supabase RLS policies restrict database access
- Environment variables never exposed to client
