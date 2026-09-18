import React, { useState, useEffect, useCallback } from 'react';
import { getAnalyticsOverview, getPageViewTrends, getTopPages, getSessionDurations, getVisitorGeoStats, getDeviceStats } from '../../services/adminDataService';

const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState({});
  const [trends, setTrends] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [durations, setDurations] = useState({});
  const [geo, setGeo] = useState([]);
  const [devices, setDevices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState(30);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [ov, tr, tp, du, ge, dv] = await Promise.all([
        getAnalyticsOverview(),
        getPageViewTrends(period),
        getTopPages(20),
        getSessionDurations(),
        getVisitorGeoStats(),
        getDeviceStats()
      ]);
      setOverview(ov);
      setTrends(tr);
      setTopPages(tp);
      setDurations(du);
      setGeo(ge);
      setDevices(dv);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [period]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fmtDuration = (ms) => {
    if (!ms || ms === 0) return '0s';
    const s = Math.round(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}m ${rs}s`;
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Tracker</h2>
          <p className="text-gray-400 text-sm mt-1">Real visitor data — no mock or dummy data</p>
        </div>
        <select value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500">
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-gray-400">Unique Visitors</span>
          <p className="text-3xl font-extrabold text-white mt-2">{overview.uniqueVisitors || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-cyan-400">Total Sessions</span>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2">{overview.totalSessions || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Total visits (session count)</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-emerald-400">Page Views</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">{overview.totalPageViews || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-blue-400">Today Sessions</span>
          <p className="text-3xl font-extrabold text-blue-400 mt-2">{overview.todaySessions || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Session Durations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase text-gray-400">Average</span>
              <p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.avg)}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">Median</span>
              <p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.median)}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">Longest</span>
              <p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.max)}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">Sessions Tracked</span>
              <p className="text-xl font-bold text-white mt-1">{durations.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Visitor Geography</h3>
          {geo.length === 0 ? (
            <p className="text-gray-500 text-sm">No geo data yet.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-auto">
              {geo.map((g) => (
                <div key={g.country} className="flex justify-between text-sm">
                  <span className="text-gray-300">{g.country}</span>
                  <span className="text-gray-400">{g.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Page View Trends ({period}d)</h3>
        {trends.length === 0 ? (
          <p className="text-gray-500 text-sm">No page view data yet.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-auto">
            {trends.map((t) => {
              const maxViews = Math.max(...trends.map((d) => d.views), 1);
              const pct = Math.round((t.views / maxViews) * 100);
              return (
                <div key={t.date} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300 font-mono">{t.date}</span>
                    <span className="text-gray-400">{t.views} views / {t.uniquePaths} pages</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Pages</h3>
          {topPages.length === 0 ? (
            <p className="text-gray-500 text-sm">No page view data yet.</p>
          ) : (
            <div className="space-y-2">
              {topPages.map((p) => (
                <div key={p.path} className="flex justify-between text-sm">
                  <span className="text-cyan-400 font-mono text-xs">{p.path}</span>
                  <span className="text-gray-400">{p.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Devices & Browsers</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs uppercase text-gray-400">Devices</span>
              {devices.devices?.map((d) => (
                <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between">
                  <span>{d.label}</span><span className="text-gray-400">{d.count}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">Browsers</span>
              {devices.browsers?.map((d) => (
                <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between">
                  <span>{d.label}</span><span className="text-gray-400">{d.count}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">OS</span>
              {devices.oses?.map((d) => (
                <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between">
                  <span>{d.label}</span><span className="text-gray-400">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
