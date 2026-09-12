import { Router } from 'express';
import db from '../db.js';
import { resolveGeo, parseDevice } from '../lib/geo.js';
import { SITE_PAGES, buildSitemapXml } from '../lib/seo.js';

const router = Router();

router.post('/contacts', (req, res) => {
  const { name, email, phone, company, subject, service, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email and message are required' });
  }

  const info = db.prepare(`
    INSERT INTO contacts (name, email, phone, company, subject, service, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    String(name).trim().slice(0, 120),
    String(email).trim().toLowerCase().slice(0, 180),
    phone ? String(phone).trim().slice(0, 40) : '',
    company ? String(company).trim().slice(0, 120) : '',
    subject ? String(subject).trim().slice(0, 180) : '',
    service ? String(service).trim().slice(0, 80) : 'General Inquiry',
    String(message).trim().slice(0, 4000)
  );

  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ success: true, message: 'Message received', contact: { id: contact.id, created_at: contact.created_at } });
});

router.post('/analytics/session', (req, res) => {
  const { sessionId, visitorId, path, title, referrer, language, timezone, country, utm } = req.body || {};
  if (!sessionId) return res.status(400).json({ success: false, error: 'sessionId required' });

  const ua = req.headers['user-agent'] || '';
  const geo = resolveGeo({ timezone, language, country });
  const device = parseDevice(ua);
  const now = new Date().toISOString();
  const existing = db.prepare('SELECT id FROM sessions WHERE id = ?').get(sessionId);

  if (!existing) {
    db.prepare(`
      INSERT INTO sessions (
        id, visitor_id, started_at, last_seen, country, region, city, device, browser, os,
        language, timezone, referrer, landing_page, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      sessionId, visitorId || sessionId, now, now, geo.country, geo.region, '',
      device.device, device.browser, device.os, language || '', timezone || '', referrer || '',
      path || '/', utm?.source || '', utm?.medium || '', utm?.campaign || ''
    );
  } else {
    db.prepare("UPDATE sessions SET last_seen = ?, country = COALESCE(NULLIF(country, 'Unknown'), ?) WHERE id = ?")
      .run(now, geo.country, sessionId);
  }

  if (path) {
    db.prepare(`INSERT INTO page_views (session_id, path, title, referrer) VALUES (?, ?, ?, ?)`)
      .run(sessionId, String(path).slice(0, 500), String(title || '').slice(0, 200), String(referrer || '').slice(0, 1000));
  }

  res.json({ success: true });
});

router.post('/analytics/heartbeat', (req, res) => {
  const { sessionId, path, durationMs } = req.body || {};
  if (!sessionId) return res.json({ success: true });
  const now = new Date().toISOString();
  db.prepare('UPDATE sessions SET last_seen = ? WHERE id = ?').run(now, sessionId);
  if (durationMs && path) {
    db.prepare(`
      UPDATE page_views SET duration_ms = duration_ms + ?
      WHERE id = (SELECT id FROM page_views WHERE session_id = ? AND path = ? ORDER BY id DESC LIMIT 1)
    `).run(Math.max(0, Math.min(Number(durationMs) || 0, 86400000)), sessionId, path);
  }
  res.json({ success: true });
});

router.post('/analytics/event', (req, res) => {
  const { sessionId, name, payload } = req.body || {};
  if (!sessionId || !name) return res.status(400).json({ success: false, error: 'sessionId and name required' });
  db.prepare('INSERT INTO events (session_id, name, payload) VALUES (?, ?, ?)').run(
    sessionId,
    String(name).slice(0, 80),
    JSON.stringify(payload || {})
  );
  res.json({ success: true });
});

router.get('/seo/sitemap.xml', (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://auraofficial.in';
  res.type('application/xml').send(buildSitemapXml(siteUrl));
});

router.get('/seo/pages', (_req, res) => {
  res.json({ success: true, pages: SITE_PAGES });
});

export default router;
