import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';
import supabase from '../lib/supabaseClient';
import { resolveGeo, parseDevice } from '../lib/analyticsUtils';
import { trackPpcClick } from '../services/adminDataService';

function getSessionId() {
  const key = 'aura_sid';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getVisitorId() {
  const key = 'aura_vid';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `v_${Date.now()}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function utmFromSearch(search) {
  const q = new URLSearchParams(search);
  return {
    source: q.get('utm_source') || '',
    medium: q.get('utm_medium') || '',
    campaign: q.get('utm_campaign') || ''
  };
}

async function upsertSession(sessionId, visitorId, path, utm) {
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const geo = resolveGeo({ timezone, language });
  const device = parseDevice(navigator.userAgent);
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('sessions')
    .upsert({
      id: sessionId,
      visitor_id: visitorId,
      started_at: now,
      last_seen: now,
      country: geo.country,
      region: geo.region,
      device: device.device,
      browser: device.browser,
      os: device.os,
      language,
      timezone,
      referrer: document.referrer || '',
      landing_page: path || '/',
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign
    }, { onConflict: 'id' });

  if (error && error.code !== '23505') {
    return false;
  }
  return true;
}

async function insertPageView(sessionId, path, title, referrer) {
  await supabase.from('page_views').insert([{
    session_id: sessionId,
    path: String(path).slice(0, 500),
    title: String(title || '').slice(0, 200),
    referrer: String(referrer || '').slice(0, 1000)
  }]);
}

async function updateHeartbeat(sessionId, path, durationMs) {
  const now = new Date().toISOString();
  await supabase.from('sessions').update({ last_seen: now }).eq('id', sessionId);

  if (durationMs && path) {
    const { data } = await supabase
      .from('page_views')
      .select('id, duration_ms')
      .eq('session_id', sessionId)
      .eq('path', path)
      .order('created_at', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      await supabase
        .from('page_views')
        .update({ duration_ms: (data[0].duration_ms || 0) + Math.max(0, Math.min(durationMs, 86400000)) })
        .eq('id', data[0].id);
    }
  }
}

async function insertEvent(sessionId, name, payload) {
  await supabase.from('events').insert([{
    session_id: sessionId,
    name: String(name).slice(0, 80),
    payload: payload || {}
  }]);
}

const AnalyticsTracker = () => {
  const location = useLocation();
  const lastPath = useRef('');

  useEffect(() => {
    const sessionId = getSessionId();
    const visitorId = getVisitorId();
    const path = location.pathname;
    if (path === lastPath.current) return;
    lastPath.current = path;

    const utm = utmFromSearch(location.search);
    if (utm.source || utm.medium || utm.campaign) {
      trackPpcClick({ sessionId, visitorId, path, utm });
    }
    upsertSession(sessionId, visitorId, path, utm).then((ok) => {
      if (ok) {
        insertPageView(sessionId, path, document.title, document.referrer);
      }
    });
  }, [location]);

  useEffect(() => {
    const sessionId = getSessionId();
    const beat = () => {
      updateHeartbeat(sessionId, window.location.pathname, 15000);
    };
    const id = setInterval(beat, 15000);

    const sendVital = (metric) => {
      insertEvent(sessionId, 'web-vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        path: window.location.pathname
      });
    };

    onCLS(sendVital);
    onINP(sendVital);
    onLCP(sendVital);
    onTTFB(sendVital);

    return () => clearInterval(id);
  }, []);

  return null;
};

export default AnalyticsTracker;
