import supabase from '../lib/supabaseClient';

// ─── SEO Pages ───
export async function getSeoPages() {
  const { data, error } = await supabase.from('seo_pages').select('*').order('path', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getSeoPage(path) {
  const { data, error } = await supabase.from('seo_pages').select('*').eq('path', path).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function upsertSeoPage(row) {
  const payload = {
    path: row.path,
    title: row.title || '',
    description: row.description || '',
    keywords: row.keywords || '',
    og_image: row.og_image || '',
    schema_json: row.schema_json || null,
    canonical_url: row.canonical_url || '',
    is_indexed: row.is_indexed !== false,
    focus_keyword: row.focus_keyword || '',
    og_title: row.og_title || '',
    updated_at: new Date().toISOString()
  };
  const { data, error } = await supabase.from('seo_pages').upsert(payload, { onConflict: 'path' }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSeoPage(id) {
  const { error } = await supabase.from('seo_pages').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

// ─── Services ───
export async function getServices(activeOnly = false) {
  let q = supabase.from('services').select('*').order('sort_order', { ascending: true });
  if (activeOnly) q = q.eq('is_active', true);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getServiceBySlug(slug) {
  const { data, error } = await supabase.from('services').select('*').eq('slug', slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function upsertService(row) {
  const payload = {
    slug: row.slug,
    title: row.title || '',
    short_desc: row.short_desc || '',
    full_desc: row.full_desc || '',
    icon: row.icon || '',
    category: row.category || 'general',
    is_active: row.is_active !== false,
    sort_order: row.sort_order || 0,
    meta_title: row.meta_title || '',
    meta_desc: row.meta_desc || '',
    features: row.features || [],
    pricing: row.pricing || [],
    testimonials: row.testimonials || [],
    image_url: row.image_url || '',
    updated_at: new Date().toISOString()
  };
  const { data, error } = await supabase.from('services').upsert(payload, { onConflict: 'slug' }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteService(id) {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

// ─── Marketing Campaigns ───
export async function getMarketingCampaigns() {
  const { data, error } = await supabase.from('marketing_campaigns').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertMarketingCampaign(row) {
  const payload = {
    name: row.name,
    channel: row.channel || 'email',
    trigger_event: row.trigger_event || '',
    status: row.status || 'draft',
    config: row.config || {},
    email_subject: row.email_subject || '',
    email_body: row.email_body || '',
    ab_variant_b_subject: row.ab_variant_b_subject || '',
    ab_variant_b_body: row.ab_variant_b_body || '',
    updated_at: new Date().toISOString()
  };
  if (row.id) {
    const { data, error } = await supabase.from('marketing_campaigns').update(payload).eq('id', row.id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  const { data, error } = await supabase.from('marketing_campaigns').insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMarketingCampaign(id) {
  const { error } = await supabase.from('marketing_campaigns').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

// ─── PPC Campaigns ───
export async function getPpcCampaigns() {
  const { data, error } = await supabase.from('ppc_campaigns').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertPpcCampaign(row) {
  const payload = {
    name: row.name,
    platform: row.platform || 'google',
    source: row.source || '',
    medium: row.medium || '',
    campaign_id: row.campaign_id || '',
    budget: row.budget || 0,
    is_active: row.is_active !== false,
    spend: row.spend || 0,
    currency: row.currency || 'INR',
    target_geo: row.target_geo || 'IN',
    budget_alert_threshold: row.budget_alert_threshold || 80.0,
    updated_at: new Date().toISOString()
  };
  if (row.id) {
    const { data, error } = await supabase.from('ppc_campaigns').update(payload).eq('id', row.id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  const { data, error } = await supabase.from('ppc_campaigns').insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePpcCampaign(id) {
  const { error } = await supabase.from('ppc_campaigns').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

export async function getPpcClicks(campaignId) {
  let q = supabase.from('ppc_clicks').select('*').order('created_at', { ascending: false }).limit(500);
  if (campaignId) q = q.eq('campaign_id', campaignId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function markPpcConversion(clickId) {
  const { data, error } = await supabase.from('ppc_clicks').update({ is_conversion: true }).eq('id', clickId).select().single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── Social Posts ───
export async function getSocialPosts() {
  const { data, error } = await supabase.from('social_posts').select('*').order('scheduled_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertSocialPost(row) {
  const payload = {
    platform: row.platform,
    content: row.content || '',
    media_url: row.media_url || '',
    scheduled_at: row.scheduled_at || null,
    status: row.status || 'draft',
    post_url: row.post_url || '',
    hashtags: row.hashtags || '',
    updated_at: new Date().toISOString()
  };
  if (row.id) {
    const { data, error } = await supabase.from('social_posts').update(payload).eq('id', row.id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
  const { data, error } = await supabase.from('social_posts').insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSocialPost(id) {
  const { error } = await supabase.from('social_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

// ─── Analytics ───
export async function getAnalyticsOverview() {
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

  const [totalPageViews, totalSessions, totalVisitors, todayPageViews, todaySessions, last7Views, last30Views] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('sessions').select('*', { count: 'exact', head: true }),
    supabase.from('sessions').select('visitor_id', { head: false }).not('visitor_id', 'is', null),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('sessions').select('*', { count: 'exact', head: true }).gte('started_at', today),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo)
  ]);

  const uniqueVisitors = new Set((totalVisitors.data || []).map((r) => r.visitor_id).filter(Boolean)).size;

  return {
    totalPageViews: totalPageViews.count || 0,
    totalSessions: totalSessions.count || 0,
    uniqueVisitors,
    todayPageViews: todayPageViews.count || 0,
    todaySessions: todaySessions.count || 0,
    last7Views: last7Views.count || 0,
    last30Views: last30Views.count || 0
  };
}

export async function getPageViewTrends(days = 30) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const { data, error } = await supabase
    .from('page_views')
    .select('created_at, path')
    .gte('created_at', since)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);

  const byDay = {};
  (data || []).forEach((pv) => {
    const day = pv.created_at?.slice(0, 10);
    if (!day) return;
    if (!byDay[day]) byDay[day] = { date: day, views: 0, uniquePaths: new Set() };
    byDay[day].views++;
    byDay[day].uniquePaths.add(pv.path);
  });

  return Object.values(byDay).map((d) => ({
    date: d.date,
    views: d.views,
    uniquePaths: d.uniquePaths.size
  }));
}

export async function getTopPages(limit = 20) {
  const { data, error } = await supabase
    .from('page_views')
    .select('path')
    .order('created_at', { ascending: false })
    .limit(2000);
  if (error) throw new Error(error.message);

  const map = {};
  (data || []).forEach((pv) => {
    const p = pv.path || '/';
    map[p] = (map[p] || 0) + 1;
  });

  return Object.entries(map)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export async function getSessionDurations() {
  const { data, error } = await supabase
    .from('sessions')
    .select('started_at, last_seen')
    .order('started_at', { ascending: false })
    .limit(1000);
  if (error) throw new Error(error.message);

  const durations = (data || [])
    .map((s) => {
      if (!s.started_at || !s.last_seen) return 0;
      return Math.max(0, new Date(s.last_seen).getTime() - new Date(s.started_at).getTime());
    })
    .filter((d) => d > 0);

  if (durations.length === 0) return { avg: 0, median: 0, max: 0, count: 0 };

  const sorted = durations.sort((a, b) => a - b);
  const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
  const median = sorted[Math.floor(sorted.length / 2)];
  const max = sorted[sorted.length - 1];

  return { avg, median, max, count: durations.length };
}

export async function getVisitorGeoStats() {
  const { data, error } = await supabase
    .from('sessions')
    .select('country, region')
    .neq('country', 'Unknown')
    .order('started_at', { ascending: false })
    .limit(2000);
  if (error) throw new Error(error.message);

  const map = {};
  (data || []).forEach((r) => {
    const key = r.country || 'Unknown';
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getDeviceStats() {
  const { data, error } = await supabase
    .from('sessions')
    .select('device, browser, os')
    .order('started_at', { ascending: false })
    .limit(2000);
  if (error) throw new Error(error.message);

  const devices = {}, browsers = {}, oses = {};
  (data || []).forEach((r) => {
    const d = r.device || 'unknown';
    const b = r.browser || 'Other';
    const o = r.os || 'Other';
    devices[d] = (devices[d] || 0) + 1;
    browsers[b] = (browsers[b] || 0) + 1;
    oses[o] = (oses[o] || 0) + 1;
  });

  return {
    devices: Object.entries(devices).map(([k, v]) => ({ label: k, count: v })).sort((a, b) => b.count - a.count),
    browsers: Object.entries(browsers).map(([k, v]) => ({ label: k, count: v })).sort((a, b) => b.count - a.count),
    oses: Object.entries(oses).map(([k, v]) => ({ label: k, count: v })).sort((a, b) => b.count - a.count)
  };
}

// ─── Analytics with custom date range ───
export async function getAnalyticsOverviewCustom(startDate, endDate) {
  const start = new Date(startDate).toISOString();
  const end = new Date(endDate).toISOString();

  const [pageViews, sessions, visitors] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', start).lte('created_at', end),
    supabase.from('sessions').select('*', { count: 'exact', head: true }).gte('started_at', start).lte('started_at', end),
    supabase.from('sessions').select('visitor_id').gte('started_at', start).lte('started_at', end)
  ]);

  const uniqueVisitors = new Set((visitors.data || []).map((r) => r.visitor_id).filter(Boolean)).size;

  return {
    pageViews: pageViews.count || 0,
    sessions: sessions.count || 0,
    uniqueVisitors
  };
}

export async function getPageViewTrendsCustom(startDate, endDate) {
  const start = new Date(startDate).toISOString();
  const end = new Date(endDate).toISOString();
  const { data, error } = await supabase
    .from('page_views')
    .select('created_at, path')
    .gte('created_at', start)
    .lte('created_at', end)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);

  const byDay = {};
  (data || []).forEach((pv) => {
    const day = pv.created_at?.slice(0, 10);
    if (!day) return;
    if (!byDay[day]) byDay[day] = { date: day, views: 0, uniquePaths: new Set() };
    byDay[day].views++;
    byDay[day].uniquePaths.add(pv.path);
  });

  return Object.values(byDay).map((d) => ({
    date: d.date,
    views: d.views,
    uniquePaths: d.uniquePaths.size
  }));
}

export async function getFunnelData() {
  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('id, landing_page')
    .order('started_at', { ascending: false })
    .limit(2000);
  if (error) return [];

  const sessionIds = (sessions || []).map((s) => s.id);
  if (sessionIds.length === 0) return [];

  const { data: pageViews } = await supabase
    .from('page_views')
    .select('session_id, path')
    .in('session_id', sessionIds);

  const { data: contacts } = await supabase
    .from('contacts')
    .select('id');

  const visitedHome = (sessions || []).filter((s) => s.landing_page === '/' || s.landing_page === '').length;
  const visitedServices = new Set((pageViews || []).filter((pv) => pv.path?.includes('services')).map((pv) => pv.session_id)).size;
  const visitedContact = new Set((pageViews || []).filter((pv) => pv.path?.includes('contact')).map((pv) => pv.session_id)).size;
  const submittedForm = (contacts || []).length;

  return [
    { stage: 'Visited Site', count: visitedHome || sessions.length, pct: 100 },
    { stage: 'Viewed Services', count: visitedServices, pct: sessions.length > 0 ? Math.round((visitedServices / sessions.length) * 100) : 0 },
    { stage: 'Viewed Contact', count: visitedContact, pct: sessions.length > 0 ? Math.round((visitedContact / sessions.length) * 100) : 0 },
    { stage: 'Submitted Form', count: submittedForm, pct: sessions.length > 0 ? Math.round((submittedForm / sessions.length) * 100) : 0 }
  ];
}

export async function getGoals() {
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('id, created_at, status')
    .order('created_at', { ascending: false })
    .limit(2000);
  if (error) return [];

  const total = (contacts || []).length;
  const won = (contacts || []).filter((c) => c.status === 'won').length;
  const closed = (contacts || []).filter((c) => c.status === 'closed').length;
  const newLeads = (contacts || []).filter((c) => c.status === 'new').length;

  return [
    { label: 'Total Leads', value: total, target: 100, pct: Math.min(100, Math.round((total / 100) * 100)) },
    { label: 'New Leads', value: newLeads, target: 50, pct: Math.min(100, Math.round((newLeads / 50) * 100)) },
    { label: 'Won Deals', value: won, target: 20, pct: Math.min(100, Math.round((won / 20) * 100)) },
    { label: 'Closed Deals', value: closed, target: 15, pct: Math.min(100, Math.round((closed / 15) * 100)) }
  ];
}

export function exportToCsv(filename, rows) {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => {
      const val = row[header];
      if (val === null || val === undefined) return '';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(','))
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ─── PPC Click Tracking (public, anonymous) ───
export async function trackPpcClick({ campaignId, sessionId, visitorId, path, utm }) {
  const { error } = await supabase.from('ppc_clicks').insert([{
    campaign_id: campaignId || null,
    session_id: sessionId || '',
    visitor_id: visitorId || '',
    path: path || window.location.pathname,
    is_conversion: false,
    utm_source: utm?.source || '',
    utm_medium: utm?.medium || '',
    utm_campaign: utm?.campaign || ''
  }]);
  if (error) return false;
  return true;
}
