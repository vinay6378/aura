import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api';

export default function GlobalReach() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data: d } = await api.get('/api/admin/overview');
      setData(d);
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  if (!data) return <p className="text-white/50">Mapping reach…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Global digitalization</h1>
      <p className="text-white/50 max-w-2xl">
        Audience origin is inferred from timezone and language so AURA can expand beyond India
        while staying privacy-friendly. Pair this with hreflang, sitemap, and Open Graph on the public site.
      </p>
      <div className="card p-5 h-96">
        <ResponsiveContainer>
          <BarChart data={data.countries} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid stroke="#2a2a44" />
            <XAxis type="number" stroke="#888" />
            <YAxis type="category" dataKey="country" stroke="#888" width={120} />
            <Tooltip contentStyle={{ background: '#10101c', border: '1px solid #2a2a44' }} />
            <Bar dataKey="n" fill="#22d3ee" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {data.devices.map((d) => (
          <div key={d.device} className="kpi">
            <p className="text-white/50 capitalize">{d.device}</p>
            <p className="text-2xl font-bold">{d.n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
