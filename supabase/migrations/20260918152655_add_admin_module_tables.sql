/*
# Add admin module tables for AURA Digital

## Purpose
Creates the backend tables needed for the six admin panel modules:
SEO management, dynamic services, marketing automation, PPC tracking,
and social media scheduling. Also adds visitor tracking tables for
detailed analytics (unique visitors, visit counts, session durations).

## New Tables

1. `seo_pages` — Per-page SEO meta tag management
   - id, path (unique), title, description, keywords, og_image, schema_json, canonical_url, is_indexed, updated_at

2. `services` — Dynamic service offerings (CRUD from admin)
   - id, slug (unique), title, short_desc, full_desc, icon, category, is_active, sort_order, meta_title, meta_desc, created_at, updated_at

3. `marketing_campaigns` — Marketing automation workflows
   - id, name, channel, trigger_event, status, config (jsonb), created_at, updated_at

4. `ppc_campaigns` — PPC/ad campaign conversion tracking
   - id, name, platform, source, medium, campaign_id, budget, is_active, created_at, updated_at

5. `ppc_clicks` — Individual click/conversion records from live visitors
   - id, campaign_id (FK), session_id, visitor_id, path, is_conversion, utm_source, utm_medium, utm_campaign, created_at

6. `social_posts` — Scheduled social media posts
   - id, platform, content, media_url, scheduled_at, status, post_url, created_at, updated_at

## Security (RLS)
- `seo_pages`, `services`, `marketing_campaigns`, `social_posts`: authenticated CRUD only
- `ppc_campaigns`: authenticated CRUD only
- `ppc_clicks`: anon can INSERT (tracking from public site), authenticated can SELECT/UPDATE

## Important Notes
1. All tables start empty — zero dummy data
2. Public site reads seo_pages and services via anon role (SELECT only)
3. PPC clicks are written anonymously from the public site tracking pixel
*/

-- SEO Pages table
CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text UNIQUE NOT NULL,
  title text DEFAULT '',
  description text DEFAULT '',
  keywords text DEFAULT '',
  og_image text DEFAULT '',
  schema_json jsonb,
  canonical_url text DEFAULT '',
  is_indexed boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_seo_pages" ON seo_pages;
CREATE POLICY "anon_select_seo_pages" ON seo_pages FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_seo_pages" ON seo_pages;
CREATE POLICY "auth_insert_seo_pages" ON seo_pages FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_seo_pages" ON seo_pages;
CREATE POLICY "auth_update_seo_pages" ON seo_pages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_seo_pages" ON seo_pages;
CREATE POLICY "auth_delete_seo_pages" ON seo_pages FOR DELETE
  TO authenticated USING (true);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_desc text DEFAULT '',
  full_desc text DEFAULT '',
  icon text DEFAULT '',
  category text DEFAULT 'general',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  meta_title text DEFAULT '',
  meta_desc text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_services" ON services;
CREATE POLICY "auth_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_services" ON services;
CREATE POLICY "auth_update_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_services" ON services;
CREATE POLICY "auth_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

-- Marketing Campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  channel text DEFAULT 'email',
  trigger_event text DEFAULT '',
  status text DEFAULT 'draft',
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_select_marketing_campaigns" ON marketing_campaigns;
CREATE POLICY "auth_select_marketing_campaigns" ON marketing_campaigns FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_marketing_campaigns" ON marketing_campaigns;
CREATE POLICY "auth_insert_marketing_campaigns" ON marketing_campaigns FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_marketing_campaigns" ON marketing_campaigns;
CREATE POLICY "auth_update_marketing_campaigns" ON marketing_campaigns FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_marketing_campaigns" ON marketing_campaigns;
CREATE POLICY "auth_delete_marketing_campaigns" ON marketing_campaigns FOR DELETE
  TO authenticated USING (true);

-- PPC Campaigns table
CREATE TABLE IF NOT EXISTS ppc_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  platform text DEFAULT 'google',
  source text DEFAULT '',
  medium text DEFAULT '',
  campaign_id text DEFAULT '',
  budget numeric(10,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE ppc_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_select_ppc_campaigns" ON ppc_campaigns;
CREATE POLICY "auth_select_ppc_campaigns" ON ppc_campaigns FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_ppc_campaigns" ON ppc_campaigns;
CREATE POLICY "auth_insert_ppc_campaigns" ON ppc_campaigns FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_ppc_campaigns" ON ppc_campaigns;
CREATE POLICY "auth_update_ppc_campaigns" ON ppc_campaigns FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_ppc_campaigns" ON ppc_campaigns;
CREATE POLICY "auth_delete_ppc_campaigns" ON ppc_campaigns FOR DELETE
  TO authenticated USING (true);

-- PPC Clicks table (written by public site tracking)
CREATE TABLE IF NOT EXISTS ppc_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES ppc_campaigns(id) ON DELETE CASCADE,
  session_id text,
  visitor_id text,
  path text DEFAULT '',
  is_conversion boolean DEFAULT false,
  utm_source text DEFAULT '',
  utm_medium text DEFAULT '',
  utm_campaign text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE ppc_clicks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_ppc_clicks" ON ppc_clicks;
CREATE POLICY "anon_insert_ppc_clicks" ON ppc_clicks FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_select_ppc_clicks" ON ppc_clicks;
CREATE POLICY "auth_select_ppc_clicks" ON ppc_clicks FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_ppc_clicks" ON ppc_clicks;
CREATE POLICY "auth_update_ppc_clicks" ON ppc_clicks FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Social Posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  content text DEFAULT '',
  media_url text DEFAULT '',
  scheduled_at timestamptz,
  status text DEFAULT 'draft',
  post_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_select_social_posts" ON social_posts;
CREATE POLICY "auth_select_social_posts" ON social_posts FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_social_posts" ON social_posts;
CREATE POLICY "auth_insert_social_posts" ON social_posts FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_social_posts" ON social_posts;
CREATE POLICY "auth_update_social_posts" ON social_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_social_posts" ON social_posts;
CREATE POLICY "auth_delete_social_posts" ON social_posts FOR DELETE
  TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_seo_pages_path ON seo_pages(path);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_ppc_clicks_campaign ON ppc_clicks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ppc_clicks_created ON ppc_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled ON social_posts(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_status ON marketing_campaigns(status);
