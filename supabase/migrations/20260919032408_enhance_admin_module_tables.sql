-- Enhance admin module tables with additional columns

-- Services: add features, pricing, testimonials
ALTER TABLE services ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS pricing jsonb DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS testimonials jsonb DEFAULT '[]'::jsonb;
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url text DEFAULT '';

-- SEO pages: add focus_keyword for SEO scoring
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS focus_keyword text DEFAULT '';
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS og_title text DEFAULT '';

-- Marketing campaigns: add email template, A/B testing, performance metrics
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS email_subject text DEFAULT '';
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS email_body text DEFAULT '';
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS ab_variant_b_subject text DEFAULT '';
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS ab_variant_b_body text DEFAULT '';
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS sent_count integer DEFAULT 0;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS open_count integer DEFAULT 0;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS click_count integer DEFAULT 0;
ALTER TABLE marketing_campaigns ADD COLUMN IF NOT EXISTS conversion_count integer DEFAULT 0;

-- PPC campaigns: add spend, currency, target_geo
ALTER TABLE ppc_campaigns ADD COLUMN IF NOT EXISTS spend numeric(10,2) DEFAULT 0;
ALTER TABLE ppc_campaigns ADD COLUMN IF NOT EXISTS currency text DEFAULT 'INR';
ALTER TABLE ppc_campaigns ADD COLUMN IF NOT EXISTS target_geo text DEFAULT 'IN';
ALTER TABLE ppc_campaigns ADD COLUMN IF NOT EXISTS budget_alert_threshold numeric(5,2) DEFAULT 80.0;

-- Social posts: add hashtags, analytics fields
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS hashtags text DEFAULT '';
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS comments integer DEFAULT 0;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS shares integer DEFAULT 0;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS reach integer DEFAULT 0;
