import { Router } from 'express';
import db from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { SITE_PAGES, computeSeoAudit, buildSitemapXml } from '../lib/seo.js';

const router = Router();
router.use(authRequired);

const LIVE_WINDOW_SECONDS = 90;

function liveVisitors() {
  return db.prepare(`
    SELECT * FROM sessions
    WHERE datetime(last_seen) >= datetime('now', ?)
    ORDER BY last_seen DESC
  `).all(`-${LIVE_WINDOW_SECONDS} seconds`);
}

router.get('/overview', (_req, res) => {
  const totals = {
    contacts: db.prepare('SELECT COUNT(*) AS n FROM contacts').get().n,
    pageViews: db.prepare('SELECT COUNT(*) AS n FROM page_views').get().n,
    sessions: db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n,
    live: liveVisitors().length
  };
  const newLeads = db.prepare(`SELECT COUNT(*) AS n FROM contacts WHERE status = 'new'`).get().n;
  const todayViews = db.prepare(`
    SELECT COUNT(*) AS n FROM page_views WHERE date(created_at) = date('now')
  `).get().n;
  const todayLeads = db.prepare(`
    SELECT COUNT(*) AS n FROM contacts WHERE date(created_at) = date('now')
  `).get().n;

  const trend = db.prepare(`
    SELECT date(created_at) AS day, COUNT(*) AS views
    FROM page_views
    WHERE datetime(created_at) >= datetime('now', '-14 days')
    GROUP BY date(created_at)
    ORDER BY day
  `).all();

  const leadTrend = db.prepare(`
    SELECT date(created_at) AS day, COUNT(*) AS leads
    FROM contacts
    WHERE datetime(created_at) >= datetime('now', '-14 days')
    GROUP BY date(created_at)
    ORDER BY day
  `).all();

  const topPages = db.prepare(`
    SELECT path, COUNT(*) AS views, AVG(duration_ms) AS avgDuration
    FROM page_views
    GROUP BY path
    ORDER BY views DESC
    LIMIT 10
  `).all();

  const devices = db.prepare(`
    SELECT device, COUNT(*) AS n FROM sessions GROUP BY device
  `).all();

  const countries = db.prepare(`
    SELECT country, region, COUNT(*) AS n FROM sessions GROUP BY country ORDER BY n DESC LIMIT 15
  `).all();

  res.json({
    success: true,
    totals: { ...totals, newLeads, todayViews, todayLeads },
    trend,
    leadTrend,
    topPages,
    devices,
    countries,
    live: liveVisitors()
  });
});

router.get('/live', (_req, res) => {
  res.json({ success: true, visitors: liveVisitors() });
});

router.get('/analytics', (req, res) => {
  const range = Number(req.query.days) || 30;
  const views = db.prepare(`
    SELECT * FROM page_views
    WHERE datetime(created_at) >= datetime('now', ?)
    ORDER BY created_at DESC
    LIMIT 2000
  `).all(`-${range} days`);

  const byHour = db.prepare(`
    SELECT strftime('%H', created_at) AS hour, COUNT(*) AS n
    FROM page_views
    WHERE datetime(created_at) >= datetime('now', '-7 days')
    GROUP BY hour
    ORDER BY hour
  `).all();

  const browsers = db.prepare(`SELECT browser, COUNT(*) AS n FROM sessions GROUP BY browser`).all();
  const sources = db.prepare(`
    SELECT
      CASE
        WHEN utm_source != '' THEN utm_source
        WHEN referrer LIKE '%google%' THEN 'google'
        WHEN referrer LIKE '%bing%' THEN 'bing'
        WHEN referrer LIKE '%linkedin%' THEN 'linkedin'
        WHEN referrer LIKE '%instagram%' THEN 'instagram'
        WHEN referrer LIKE '%facebook%' THEN 'facebook'
        WHEN referrer = '' OR referrer IS NULL THEN 'direct'
        ELSE 'referral'
      END AS source,
      COUNT(*) AS n
    FROM sessions
    GROUP BY source
    ORDER BY n DESC
  `).all();

  const languages = db.prepare(`
    SELECT language, COUNT(*) AS n FROM sessions WHERE language != '' GROUP BY language ORDER BY n DESC
  `).all();

  const vitals = db.prepare(`
    SELECT payload FROM events WHERE name = 'web-vital' ORDER BY id DESC LIMIT 200
  `).all().map((row) => {
    try {
      return JSON.parse(row.payload);
    } catch {
      return null;
    }
  }).filter(Boolean);

  res.json({
    success: true,
    views,
    byHour,
    browsers,
    sources,
    languages,
    vitals
  });
});

router.get('/contacts', (req, res) => {
  const status = req.query.status;
  const rows = status
    ? db.prepare('SELECT * FROM contacts WHERE status = ? ORDER BY created_at DESC').all(status)
    : db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json({ success: true, contacts: rows });
});

router.patch('/contacts/:id', (req, res) => {
  const { status, notes } = req.body || {};
  const current = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (!current) return res.status(404).json({ success: false, error: 'Not found' });
  db.prepare('UPDATE contacts SET status = ?, notes = ? WHERE id = ?').run(
    status || current.status,
    notes !== undefined ? notes : current.notes,
    req.params.id
  );
  const updated = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  res.json({ success: true, contact: updated });
});

router.delete('/contacts/:id', (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.get('/seo', (_req, res) => {
  const pageViews = db.prepare('SELECT path FROM page_views').all();
  const organicViews = db.prepare(`
    SELECT COUNT(*) AS n FROM sessions
    WHERE referrer LIKE '%google%' OR utm_medium = 'organic'
  `).get().n;
  const countries = db.prepare(`SELECT COUNT(DISTINCT country) AS n FROM sessions`).get().n;
  const contacts = db.prepare('SELECT COUNT(*) AS n FROM contacts').get().n;
  const vitalsRows = db.prepare(`SELECT payload FROM events WHERE name = 'web-vital' ORDER BY id DESC LIMIT 300`).all();
  const vitals = { sample: 0, lcpGood: 0, clsGood: 0, inpGood: 0 };
  for (const row of vitalsRows) {
    try {
      const v = JSON.parse(row.payload);
      vitals.sample += 1;
      if (v.name === 'LCP' && v.value <= 2500) vitals.lcpGood += 1;
      if (v.name === 'CLS' && v.value <= 0.1) vitals.clsGood += 1;
      if (v.name === 'INP' && v.value <= 200) vitals.inpGood += 1;
      if (v.name === 'FID' && v.value <= 100) vitals.inpGood += 1;
    } catch {
      /* ignore */
    }
  }

  const audit = computeSeoAudit({ pageViews, organicViews, countries, vitals, contacts });
  db.prepare('INSERT INTO seo_snapshots (overall_score, data) VALUES (?, ?)').run(
    audit.overall,
    JSON.stringify(audit)
  );

  const history = db.prepare(
    'SELECT overall_score, created_at FROM seo_snapshots ORDER BY id DESC LIMIT 20'
  ).all();

  const pagePerf = db.prepare(`
    SELECT path, COUNT(*) AS views
    FROM page_views
    GROUP BY path
    ORDER BY views DESC
  `).all();

  res.json({
    success: true,
    audit,
    history,
    pages: SITE_PAGES,
    pagePerf,
    sitemapPreview: buildSitemapXml(process.env.SITE_URL || 'https://auraofficial.in').slice(0, 500)
  });
});

router.get('/settings', (_req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json({ success: true, settings });
});

router.put('/settings', (req, res) => {
  const entries = Object.entries(req.body || {});
  const upsert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
  for (const [key, value] of entries) {
    upsert.run(String(key), String(value));
  }
  const rows = db.prepare('SELECT key, value FROM settings').all();
  res.json({ success: true, settings: Object.fromEntries(rows.map((r) => [r.key, r.value])) });
});

export default router;
