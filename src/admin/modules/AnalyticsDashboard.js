import React, { useState, useEffect, useCallback } from 'react';
import { getAnalyticsOverview, getPageViewTrends, getTopPages, getSessionDurations, getVisitorGeoStats, getDeviceStats, getAnalyticsOverviewCustom, getPageViewTrendsCustom, getFunnelData, getGoals, exportToCsv } from '../../services/adminDataService';

const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState({});
  const [trends, setTrends] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [durations, setDurations] = useState({});
  const [geo, setGeo] = useState([]);
  const [devices, setDevices] = useState({});
  const [funnel, setFunnel] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState(30);
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (useCustomRange && startDate && endDate) {
        const [ov, tr, tp, du, ge, dv, fn, gl] = await Promise.all([
          getAnalyticsOverviewCustom(startDate, endDate),
          getPageViewTrendsCustom(startDate, endDate),
          getTopPages(20),
          getSessionDurations(),
          getVisitorGeoStats(),
          getDeviceStats(),
          getFunnelData(),
          getGoals()
        ]);
        setOverview(ov);
        setTrends(tr);
        setTopPages(tp);
        setDurations(du);
        setGeo(ge);
        setDevices(dv);
        setFunnel(fn);
        setGoals(gl);
      } else {
        const [ov, tr, tp, du, ge, dv, fn, gl] = await Promise.all([
          getAnalyticsOverview(),
          getPageViewTrends(period),
          getTopPages(20),
          getSessionDurations(),
          getVisitorGeoStats(),
          getDeviceStats(),
          getFunnelData(),
          getGoals()
        ]);
        setOverview(ov);
        setTrends(tr);
        setTopPages(tp);
        setDurations(du);
        setGeo(ge);
        setDevices(dv);
        setFunnel(fn);
        setGoals(gl);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [period, useCustomRange, startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fmtDuration = (ms) => {
    if (!ms || ms === 0) return '0s';
    const s = Math.round(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}m ${rs}s`;
  };

  const handleExportTrends = () => {
    exportToCsv(`analytics_trends_${new Date().toISOString().split('T')[0]}.csv`, trends);
  };

  const handleExportPages = () => {
    exportToCsv(`top_pages_${new Date().toISOString().split('T')[0]}.csv`, topPages);
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Tracker</h2>
          <p className="text-gray-400 text-sm mt-1">Real visitor data — unique visitors, sessions, durations, goals, funnels</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" checked={useCustomRange} onChange={(e) => setUseCustomRange(e.target.checked)} className="accent-cyan-500" />
            Custom Range
          </label>
          {useCustomRange ? (
            <>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2" />
            </>
          ) : (
            <select value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2">
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          )}
          <button onClick={handleExportTrends} disabled={trends.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export Trends</button>
        </div>
      </div>

      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-gray-400">Unique Visitors</span>
          <p className="text-3xl font-extrabold text-white mt-2">{overview.uniqueVisitors || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-cyan-400">Total Sessions</span>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2">{overview.totalSessions || overview.sessions || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Total visits (session count)</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-emerald-400">Page Views</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">{overview.totalPageViews || overview.pageViews || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-blue-400">Today Sessions</span>
          <p className="text-3xl font-extrabold text-blue-400 mt-2">{overview.todaySessions || 0}</p>
        </div>
      </div>

      {/* Goal Tracking */}
      {goals.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Goal Tracking</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.map((g) => (
              <div key={g.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">{g.label}</span>
                  <span className="text-gray-400">{g.value}/{g.target}</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${g.pct >= 100 ? 'bg-emerald-500' : g.pct >= 50 ? 'bg-cyan-500' : 'bg-amber-500'}`} style={{ width: `${g.pct}%` }} />
                </div>
                <span className="text-xs text-gray-500">{g.pct}% of target</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funnel Analysis */}
      {funnel.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnel.map((stage, i) => {
              const maxWidth = 100;
              const width = i === 0 ? maxWidth : (funnel[i - 1].count > 0 ? (stage.count / funnel[i - 1].count) * maxWidth : 0);
              return (
                <div key={stage.stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{stage.stage}</span>
                    <span className="text-gray-400">{stage.count} ({stage.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-lg transition-all flex items-center justify-end pr-3" style={{ width: `${width}%` }}>
                      <span className="text-xs text-white font-semibold">{stage.count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Session Durations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-xs uppercase text-gray-400">Average</span><p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.avg)}</p></div>
            <div><span className="text-xs uppercase text-gray-400">Median</span><p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.median)}</p></div>
            <div><span className="text-xs uppercase text-gray-400">Longest</span><p className="text-xl font-bold text-white mt-1">{fmtDuration(durations.max)}</p></div>
            <div><span className="text-xs uppercase text-gray-400">Sessions Tracked</span><p className="text-xl font-bold text-white mt-1">{durations.count || 0}</p></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Visitor Geography</h3>
          {geo.length === 0 ? <p className="text-gray-500 text-sm">No geo data yet.</p> : (
            <div className="space-y-2 max-h-48 overflow-auto">
              {geo.map((g) => (
                <div key={g.country} className="flex justify-between text-sm"><span className="text-gray-300">{g.country}</span><span className="text-gray-400">{g.count}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Page View Trends ({useCustomRange ? 'custom' : period + 'd'})</h3>
          <button onClick={handleExportTrends} disabled={trends.length === 0} className="text-xs text-cyan-400 hover:underline">Export CSV</button>
        </div>
        {trends.length === 0 ? <p className="text-gray-500 text-sm">No page view data yet.</p> : (
          <div className="space-y-2 max-h-64 overflow-auto">
            {trends.map((t) => {
              const maxViews = Math.max(...trends.map((d) => d.views), 1);
              const pct = Math.round((t.views / maxViews) * 100);
              return (
                <div key={t.date} className="space-y-1">
                  <div className="flex justify-between text-xs"><span className="text-gray-300 font-mono">{t.date}</span><span className="text-gray-400">{t.views} views / {t.uniquePaths} pages</span></div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Top Pages</h3>
            <button onClick={handleExportPages} disabled={topPages.length === 0} className="text-xs text-cyan-400 hover:underline">Export CSV</button>
          </div>
          {topPages.length === 0 ? <p className="text-gray-500 text-sm">No page view data yet.</p> : (
            <div className="space-y-2">
              {topPages.map((p) => (
                <div key={p.path} className="flex justify-between text-sm"><span className="text-cyan-400 font-mono text-xs">{p.path}</span><span className="text-gray-400">{p.views}</span></div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Devices & Browsers</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs uppercase text-gray-400">Devices</span>
              {devices.devices?.map((d) => <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between"><span>{d.label}</span><span className="text-gray-400">{d.count}</span></div>)}
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">Browsers</span>
              {devices.browsers?.map((d) => <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between"><span>{d.label}</span><span className="text-gray-400">{d.count}</span></div>)}
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400">OS</span>
              {devices.oses?.map((d) => <div key={d.label} className="text-xs text-gray-300 mt-1 flex justify-between"><span>{d.label}</span><span className="text-gray-400">{d.count}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
