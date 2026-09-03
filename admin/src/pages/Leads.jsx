import React, { useEffect, useState } from 'react';
import api from '../api';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'closed'];

export default function Leads() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const load = async () => {
    const { data } = await api.get('/api/admin/contacts');
    setContacts(data.contacts || []);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 7000);
    return () => clearInterval(id);
  }, []);

  const update = async (id, status) => {
    await api.patch(`/api/admin/contacts/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/api/admin/contacts/${id}`);
    load();
  };

  const rows = contacts.filter((c) => !filter || c.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-extrabold">Lead pipeline</h1>
        <select
          className="bg-black/40 border border-line rounded-xl px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-white/50">
            <tr>
              <th className="p-3">Lead</th>
              <th className="p-3">Service</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-line align-top">
                <td className="p-3">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-white/50">{c.email}</p>
                  <p className="text-white/40">{c.phone}</p>
                  <p className="text-xs text-white/30">{c.created_at}</p>
                </td>
                <td className="p-3">{c.service}</td>
                <td className="p-3 max-w-sm">{c.message}</td>
                <td className="p-3">
                  <select
                    className="bg-black/40 border border-line rounded-lg px-2 py-1"
                    value={c.status}
                    onChange={(e) => update(c.id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button className="text-red-400" onClick={() => remove(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td className="p-6 text-white/40" colSpan={5}>No leads yet. Submit the website contact form.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
