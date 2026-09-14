import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';

const API_BASE = process.env.REACT_APP_API_URL || '';
const ANALYTICS_ENABLED = API_BASE.length > 0;

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

async function post(path, body) {
  if (!ANALYTICS_ENABLED) return;
  try {
    await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true
    });
  } catch {
    /* analytics should never break the site */
  }
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

    post('/public/analytics/session', {
      sessionId,
      visitorId,
      path,
      title: document.title,
      referrer: document.referrer,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      utm: utmFromSearch(location.search)
    });
  }, [location]);

  useEffect(() => {
    const sessionId = getSessionId();
    const beat = () => {
      post('/public/analytics/heartbeat', {
        sessionId,
        path: window.location.pathname,
        durationMs: 15000
      });
    };
    const id = setInterval(beat, 15000);

    const sendVital = (metric) => {
      post('/public/analytics/event', {
        sessionId,
        name: 'web-vital',
        payload: {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          path: window.location.pathname
        }
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
