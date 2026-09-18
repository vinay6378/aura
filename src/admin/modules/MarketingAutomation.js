import React, { useState, useEffect, useCallback } from 'react';
import { getMarketingCampaigns, upsertMarketingCampaign, deleteMarketingCampaign } from '../../services/adminDataService';

const CHANNELS = ['email', 'sms', 'whatsapp', 'social', 'webhook', 'internal'];
const TRIGGERS = ['contact_form_submit', 'page_view', 'lead_status_change', 'manual', 'scheduled'];
const STATUSES = ['draft', 'active', 'paused', 'completed'];

const MarketingAutomation = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', channel: 'email', trigger_event: 'contact_form_submit', status: 'draft', config: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMarketingCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  const handleEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, channel: c.channel, trigger_event: c.trigger_event, status: c.status, config: c.config ? JSON.stringify(c.config, null, 2) : '', id: c.id });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ name: '', channel: 'email', trigger_event: 'contact_form_submit', status: 'draft', config: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let config = {};
      if (form.config.trim()) {
        try { config = JSON.parse(form.config); }
        catch { throw new Error('Config JSON is invalid'); }
      }
      await upsertMarketingCampaign({ ...form, config });
      setEditing(null);
      fetchCampaigns();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this campaign?')) return;
    try {
      await deleteMarketingCampaign(id);
      fetchCampaigns();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading campaigns...</div>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Create Campaign' : 'Edit Campaign'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Campaign Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Channel</label>
              <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Trigger</label>
              <select value={form.trigger_event} onChange={(e) => setForm({ ...form, trigger_event: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {TRIGGERS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Workflow Config (JSON)</label>
            <textarea value={form.config} onChange={(e) => setForm({ ...form, config: e.target.value })} rows={8} placeholder='{"steps": [...], "delay_minutes": 30}' className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Campaign'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Marketing Automation</h2>
          <p className="text-gray-400 text-sm mt-1">Triggers and workflows for marketing tasks</p>
        </div>
        <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">
          + Create Campaign
        </button>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
      {campaigns.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No campaigns yet. Click "Create Campaign" to set up a marketing workflow.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="p-4">Campaign</th>
                  <th className="p-4">Channel</th>
                  <th className="p-4">Trigger</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-semibold text-white">{c.name}</td>
                    <td className="p-4 text-xs text-cyan-400">{c.channel}</td>
                    <td className="p-4 text-xs text-gray-400">{c.trigger_event}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        c.status === 'active' ? 'bg-emerald-950/70 text-emerald-400' :
                        c.status === 'paused' ? 'bg-amber-950/70 text-amber-400' :
                        c.status === 'completed' ? 'bg-blue-950/70 text-blue-400' :
                        'bg-slate-700 text-gray-400'
                      }`}>{c.status}</span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => handleEdit(c)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingAutomation;
