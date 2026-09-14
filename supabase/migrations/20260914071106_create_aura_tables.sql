/*
# Create AURA Digital backend tables in Supabase

## Purpose
Migrates the AURA Digital backend from a self-hosted Express + SQLite server
to Supabase, eliminating the need for a Node.js process on shared hosting.
The React frontend talks directly to Supabase via the anon key for public
writes (contact form, analytics) and via authenticated sessions for admin
reads/updates (dashboard, lead management).

## New Tables

1. `contacts` — Contact form submissions from the public website.
   - `id` (uuid, PK)
   - `name`, `email`, `phone`, `company`, `subject`, `service`, `message` (text)
   - `status` (text, default 'new') — pipeline stage: new/contacted/qualified/won/closed
   - `notes` (text, default '') — admin notes
   - `created_at` (timestamptz, default now())

2. `sessions` — Analytics visitor sessions.
   - `id` (text, PK) — client-generated session UUID
   - `visitor_id`, `started_at`, `last_seen`, `country`, `region`, `city`
   - `device`, `browser`, `os`, `language`, `timezone`, `referrer`
   - `landing_page`, `utm_source`, `utm_medium`, `utm_campaign`

3. `page_views` — Individual page view events tied to sessions.
   - `id` (uuid, PK)
   - `session_id` (text, FK to sessions)
   - `path`, `title`, `referrer`, `duration_ms`
   - `created_at` (timestamptz)

4. `events` — Generic analytics events (e.g. Core Web Vitals).
   - `id` (uuid, PK)
   - `session_id` (text)
   - `name` (text) — event name
   - `payload` (jsonb) — event data
   - `created_at` (timestamptz)

5. `seo_snapshots` — SEO audit score history.
   - `id` (uuid, PK)
   - `overall_score` (int)
   - `data` (jsonb)
   - `created_at` (timestamptz)

6. `settings` — Key-value site settings (admin-managed).
   - `key` (text, PK)
   - `value` (text)

## Security (RLS)

- `contacts`: anon can INSERT (public contact form); only authenticated can
  SELECT, UPDATE, DELETE (admin dashboard).
- `sessions`: anon can INSERT and UPDATE (analytics tracking); only
  authenticated can SELECT (admin dashboard).
- `page_views`: anon can INSERT; only authenticated can SELECT.
- `events`: anon can INSERT; only authenticated can SELECT.
- `seo_snapshots`: only authenticated can SELECT and INSERT (admin SEO center).
- `settings`: only authenticated can SELECT and UPDATE.

## Important Notes
1. The contact form writes anonymously — visitors don't sign in.
2. Analytics tracking writes anonymously — sessions are client-generated UUIDs.
3. All admin reads require an authenticated Supabase session (admin login).
4. No user_id columns needed — admin access is controlled by Supabase auth,
   not per-row ownership. All authenticated users are admins.
*/

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text DEFAULT '',
  subject text DEFAULT '',
  service text DEFAULT 'General Inquiry',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contacts" ON contacts;
CREATE POLICY "auth_select_contacts" ON contacts FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contacts" ON contacts;
CREATE POLICY "auth_update_contacts" ON contacts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contacts" ON contacts;
CREATE POLICY "auth_delete_contacts" ON contacts FOR DELETE
  TO authenticated USING (true);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id text PRIMARY KEY,
  visitor_id text,
  started_at timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now(),
  country text DEFAULT 'Unknown',
  region text DEFAULT 'Global',
  city text DEFAULT '',
  device text DEFAULT 'desktop',
  browser text DEFAULT 'Other',
  os text DEFAULT 'Other',
  language text DEFAULT '',
  timezone text DEFAULT '',
  referrer text DEFAULT '',
  landing_page text DEFAULT '/',
  utm_source text DEFAULT '',
  utm_medium text DEFAULT '',
  utm_campaign text DEFAULT ''
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_sessions" ON sessions;
CREATE POLICY "anon_insert_sessions" ON sessions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_sessions" ON sessions;
CREATE POLICY "anon_update_sessions" ON sessions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_sessions" ON sessions;
CREATE POLICY "auth_select_sessions" ON sessions FOR SELECT
  TO authenticated USING (true);

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text REFERENCES sessions(id) ON DELETE CASCADE,
  path text NOT NULL,
  title text DEFAULT '',
  referrer text DEFAULT '',
  duration_ms integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_page_views" ON page_views;
CREATE POLICY "anon_insert_page_views" ON page_views FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_page_views" ON page_views;
CREATE POLICY "auth_select_page_views" ON page_views FOR SELECT
  TO authenticated USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  name text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_events" ON events;
CREATE POLICY "anon_insert_events" ON events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_events" ON events;
CREATE POLICY "auth_select_events" ON events FOR SELECT
  TO authenticated USING (true);

-- SEO snapshots table
CREATE TABLE IF NOT EXISTS seo_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  overall_score integer,
  data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE seo_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_select_seo_snapshots" ON seo_snapshots;
CREATE POLICY "auth_select_seo_snapshots" ON seo_snapshots FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_seo_snapshots" ON seo_snapshots;
CREATE POLICY "auth_insert_seo_snapshots" ON seo_snapshots FOR INSERT
  TO authenticated WITH CHECK (true);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_select_settings" ON settings;
CREATE POLICY "auth_select_settings" ON settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_settings" ON settings;
CREATE POLICY "auth_update_settings" ON settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_settings" ON settings;
CREATE POLICY "auth_insert_settings" ON settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions(last_seen);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);

-- Seed default settings
INSERT INTO settings (key, value) VALUES
  ('siteName', 'AURA Digital'),
  ('siteUrl', 'https://auraofficial.in'),
  ('contactEmail', 'vs8890864@gmail.com'),
  ('trackingEnabled', 'true')
ON CONFLICT (key) DO NOTHING;
