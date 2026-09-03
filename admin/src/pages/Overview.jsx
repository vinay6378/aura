import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import api from '../api';

function Stat({ label, value, hint }) {
  return (
    <div className="kpi">
      <p className="text-white/50 text-sm">{label}</p>
      <p className="text-3xl font-extrabold mt-1">{value}</p>
      {hint && <p className="text-xs text-cyan mt-1">{hint}</p>}
    </div>
  );
}

export default function Overview() {
  const [data, setData] = useState(null);

  const load = async () => {
    const { data: d } = await api.get('/api/admin/overview');
    setData(d);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  if (!data) return <p className="text-white/50">Loading overview…</p>;

  const chart = data.trend.map((d) => ({
    day: d.day?.slice(5),
    views: d.views,
    leads: data.leadTrend.find((l) => l.day === d.day)?.leads || 0
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Performance overview</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label="Live visitors" value={data.totals.live} hint="Last 90 seconds" />
        <Stat label="Today views" value={data.totals.todayViews} />
        <Stat label="Today leads" value={data.totals.todayLeads} />
        <Stat label="New pipeline" value={data.totals.newLeads} hint={`${data.totals.contacts} total`} />
      </div>
      <div className="card p-5 h-80">
        <p className="mb-3 text-sm text-white/60">Traffic vs leads · 14 days</p>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={chart}>
            <CartesianGrid stroke="#2a2a44" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ background: '#10101c', border: '1px solid #2a2a44' }} />
            <Area type="monotone" dataKey="views" stroke="#22d3ee" fill="#22d3ee33" />
            <Area type="monotone" dataKey="leads" stroke="#8b5cf6" fill="#8b5cf633" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Top pages</p>
          <ul className="space-y-2">
            {data.topPages.map((p) => (
              <li key={p.path} className="flex justify-between text-sm">
                <span className="truncate mr-4">{p.path}</span>
                <span className="text-cyan">{p.views}</span>
              </li>
            ))}
            {!data.topPages.length && <li className="text-white/40">No traffic yet</li>}
          </ul>
        </div>
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Live sessions</p>
          <ul className="space-y-2 max-h-64 overflow-auto">
            {data.live.map((s) => (
              <li key={s.id} className="text-sm flex justify-between gap-3">
                <span>{s.country} · {s.device} · {s.browser}</span>
                <span className="text-white/40 truncate">{s.landing_page}</span>
              </li>
            ))}
            {!data.live.length && <li className="text-white/40">No one on site right now</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
