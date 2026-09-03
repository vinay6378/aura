import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api';

const COLORS = ['#22d3ee', '#8b5cf6', '#34d399', '#f59e0b', '#f43f5e', '#60a5fa'];

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: d } = await api.get('/api/admin/analytics?days=30');
      setData(d);
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  if (!data) return <p className="text-white/50">Loading analytics…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Data analysis</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5 h-80">
          <p className="text-sm text-white/60 mb-2">Hourly demand (7 days)</p>
          <ResponsiveContainer>
            <BarChart data={data.byHour}>
              <CartesianGrid stroke="#2a2a44" />
              <XAxis dataKey="hour" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#10101c', border: '1px solid #2a2a44' }} />
              <Bar dataKey="n" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5 h-80">
          <p className="text-sm text-white/60 mb-2">Acquisition sources</p>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data.sources} dataKey="n" nameKey="source" innerRadius={50} outerRadius={90}>
                {data.sources.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#10101c', border: '1px solid #2a2a44' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Browsers</p>
          {data.browsers.map((b) => (
            <div key={b.browser} className="flex justify-between text-sm py-1">
              <span>{b.browser}</span>
              <span className="text-cyan">{b.n}</span>
            </div>
          ))}
        </div>
        <div className="card p-5">
          <p className="text-sm text-white/60 mb-3">Languages</p>
          {data.languages.length ? data.languages.map((b) => (
            <div key={b.language} className="flex justify-between text-sm py-1">
              <span>{b.language}</span>
              <span className="text-cyan">{b.n}</span>
            </div>
          )) : <p className="text-white/40 text-sm">Collecting language signals…</p>}
        </div>
      </div>
      <div className="card p-5">
        <p className="text-sm text-white/60 mb-3">Core Web Vitals samples</p>
        <div className="overflow-auto max-h-64 text-sm">
          {data.vitals.slice(0, 40).map((v, i) => (
            <div key={i} className="flex justify-between border-b border-line/60 py-1">
              <span>{v.name}</span>
              <span>{typeof v.value === 'number' ? v.value.toFixed(2) : v.value} {v.path || ''}</span>
            </div>
          ))}
          {!data.vitals.length && <p className="text-white/40">Open the public site to stream vitals.</p>}
        </div>
      </div>
    </div>
  );
}
