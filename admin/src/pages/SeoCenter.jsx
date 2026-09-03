import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api';

export default function SeoCenter() {
  const [data, setData] = useState(null);

  const load = async () => {
    const { data: d } = await api.get('/api/admin/seo');
    setData(d);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  if (!data) return <p className="text-white/50">Auditing SEO…</p>;
  const { audit } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">SEO engine</h1>
          <p className="text-white/50 text-sm">Technical, content, coverage, organic, and global signals</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-cyan">{audit.overall}</p>
          <p className="text-xs text-white/40">overall score</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(audit.scores).map(([k, v]) => (
          <div key={k} className="kpi">
            <p className="text-white/50 text-sm capitalize">{k}</p>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="card p-5 h-64">
        <p className="text-sm text-white/60 mb-2">Score history</p>
        <ResponsiveContainer>
          <LineChart data={[...data.history].reverse()}>
            <XAxis dataKey="created_at" hide />
            <YAxis domain={[0, 100]} stroke="#888" />
            <Tooltip contentStyle={{ background: '#10101c', border: '1px solid #2a2a44' }} />
            <Line type="monotone" dataKey="overall_score" stroke="#8b5cf6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Recommendations</p>
          <ul className="space-y-2 text-sm">
            {audit.recommendations.length
              ? audit.recommendations.map((r) => <li key={r}>• {r}</li>)
              : <li>Signals look healthy. Keep publishing globally targeted content.</li>}
          </ul>
        </div>
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Indexed routes ({data.pages.length})</p>
          <ul className="max-h-72 overflow-auto text-sm space-y-1">
            {data.pages.map((p) => {
              const views = data.pagePerf.find((x) => x.path === p.path)?.views || 0;
              return (
                <li key={p.path} className="flex justify-between">
                  <span>{p.path}</span>
                  <span className="text-cyan">{views} views</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
