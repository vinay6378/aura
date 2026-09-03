export const SITE_PAGES = [
  { path: '/', title: 'AURA Digital', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', title: 'About Us', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', title: 'Services', priority: 0.9, changefreq: 'weekly' },
  { path: '/contact', title: 'Contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/website-development', title: 'Website Development', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/software-development', title: 'Software Development', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/mobile-application', title: 'Mobile Application', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/data-science-analyst', title: 'Data Science', priority: 0.8, changefreq: 'monthly' },
  { path: '/marketing/social-media', title: 'Social Media Marketing', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/ppc-ads', title: 'PPC Ads', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/content-marketing', title: 'Content Marketing', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/analytics', title: 'Marketing Analytics', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/social-media-content', title: 'Social Media Content', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/online-ad-campaigns', title: 'Online Ad Campaigns', priority: 0.7, changefreq: 'weekly' },
  { path: '/marketing/influencer-marketing', title: 'Influencer Marketing', priority: 0.7, changefreq: 'weekly' },
  { path: '/creative/brand-identity', title: 'Brand Identity', priority: 0.7, changefreq: 'monthly' },
  { path: '/creative/photo-editing', title: 'Photo Editing', priority: 0.6, changefreq: 'monthly' },
  { path: '/creative/print-design', title: 'Print Design', priority: 0.6, changefreq: 'monthly' },
  { path: '/creative/architectural-design', title: 'Architectural Design', priority: 0.6, changefreq: 'monthly' },
  { path: '/content/business-content', title: 'Business Content', priority: 0.6, changefreq: 'monthly' },
  { path: '/content/book-ebook-publishing', title: 'Book Publishing', priority: 0.6, changefreq: 'monthly' },
  { path: '/specialized/professional-photography', title: 'Photography', priority: 0.6, changefreq: 'monthly' },
  { path: '/privacy-policy', title: 'Privacy Policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-of-service', title: 'Terms of Service', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookie-policy', title: 'Cookie Policy', priority: 0.3, changefreq: 'yearly' }
];

export function computeSeoAudit({ pageViews, organicViews, countries, vitals, contacts }) {
  const indexedPages = SITE_PAGES.length;
  const trafficPages = new Set(pageViews.map((p) => p.path)).size;
  const coverage = Math.min(100, Math.round((trafficPages / indexedPages) * 100) || 0);
  const organicShare = pageViews.length
    ? Math.round((organicViews / pageViews.length) * 100)
    : 0;
  const globalReach = Math.min(100, countries * 8);
  const conversion = pageViews.length
    ? Math.min(100, Math.round((contacts / pageViews.length) * 400))
    : 0;
  const vitalsScore = vitals.sample
    ? Math.round(
        ((vitals.lcpGood / vitals.sample) * 40 +
          (vitals.clsGood / vitals.sample) * 30 +
          (vitals.inpGood / vitals.sample) * 30)
      )
    : 70;

  const technical = 92;
  const content = 88;
  const overall = Math.round(
    technical * 0.2 + content * 0.15 + coverage * 0.15 + organicShare * 0.15 + globalReach * 0.15 + conversion * 0.1 + vitalsScore * 0.1
  );

  return {
    overall: Math.min(100, overall),
    scores: {
      technical,
      content,
      coverage,
      organic: organicShare,
      globalReach,
      conversion,
      vitals: vitalsScore
    },
    indexedPages,
    trafficPages,
    recommendations: [
      coverage < 60 && 'Promote under-visited service pages to improve crawl coverage.',
      organicShare < 20 && 'Increase organic traffic with blog posts and backlinks targeting India + global keywords.',
      countries < 5 && 'Localize landing pages (en, hi) and run international campaigns.',
      conversion < 30 && 'Add stronger CTAs and faster contact follow-up to raise lead conversion.',
      vitals.sample && vitalsScore < 75 && 'Improve LCP/INP on hero and 3D sections for Core Web Vitals.'
    ].filter(Boolean)
  };
}

export function buildSitemapXml(siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = SITE_PAGES.map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path === '/' ? '/' : p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${p.path}" />
    <xhtml:link rel="alternate" hreflang="en-IN" href="${siteUrl}${p.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${p.path}" />
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
