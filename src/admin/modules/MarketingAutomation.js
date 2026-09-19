import React, { useState, useEffect, useCallback } from 'react';
import { getMarketingCampaigns, upsertMarketingCampaign, deleteMarketingCampaign, exportToCsv } from '../../services/adminDataService';

const CHANNELS = ['email', 'sms', 'whatsapp', 'social', 'webhook', 'internal'];
const TRIGGERS = ['contact_form_submit', 'page_view', 'lead_status_change', 'manual', 'scheduled'];
const STATUSES = ['draft', 'active', 'paused', 'completed'];

const MarketingAutomation = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', channel: 'email', trigger_event: 'contact_form_submit', status: 'draft', config: '', email_subject: '', email_body: '', ab_variant_b_subject: '', ab_variant_b_body: '' });
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
    setForm({
      name: c.name, channel: c.channel, trigger_event: c.trigger_event, status: c.status,
      config: c.config ? JSON.stringify(c.config, null, 2) : '',
      email_subject: c.email_subject || '', email_body: c.email_body || '',
      ab_variant_b_subject: c.ab_variant_b_subject || '', ab_variant_b_body: c.ab_variant_b_body || '',
      id: c.id
    });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ name: '', channel: 'email', trigger_event: 'contact_form_submit', status: 'draft', config: '', email_subject: '', email_body: '', ab_variant_b_subject: '', ab_variant_b_body: '' });
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

  const handleExport = () => {
    const rows = campaigns.map((c) => ({
      name: c.name, channel: c.channel, trigger: c.trigger_event, status: c.status,
      sent: c.sent_count || 0, opens: c.open_count || 0, clicks: c.click_count || 0, conversions: c.conversion_count || 0
    }));
    exportToCsv(`marketing_campaigns_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading campaigns...</div>;

  if (editing) {
    const openRate = editing !== 'new' && editing.sent_count > 0 ? ((editing.open_count / editing.sent_count) * 100).toFixed(1) : null;
    const clickRate = editing !== 'new' && editing.sent_count > 0 ? ((editing.click_count / editing.sent_count) * 100).toFixed(1) : null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Create Campaign' : 'Edit Campaign'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

        {editing !== 'new' && (openRate || clickRate) && (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs uppercase text-gray-400">Sent</span>
              <p className="text-xl font-bold text-white mt-1">{editing.sent_count || 0}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs uppercase text-gray-400">Open Rate</span>
              <p className="text-xl font-bold text-cyan-400 mt-1">{openRate || 0}%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs uppercase text-gray-400">Click Rate</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">{clickRate || 0}%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs uppercase text-gray-400">Conversions</span>
              <p className="text-xl font-bold text-white mt-1">{editing.conversion_count || 0}</p>
            </div>
          </div>
        )}

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

          {(form.channel === 'email' || form.channel === 'sms') && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase">Message Template</h3>
              {form.channel === 'email' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Email Subject</label>
                    <input type="text" value={form.email_subject} onChange={(e) => setForm({ ...form, email_subject: e.target.value })} placeholder="Welcome to AURA Digital" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Email Body (HTML supported)</label>
                    <textarea value={form.email_body} onChange={(e) => setForm({ ...form, email_body: e.target.value })} rows={8} placeholder={'<h2>Hello {{name}}</h2>\n<p>Thanks for your interest...</p>'} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
                    <p className="text-xs text-gray-500 mt-1">Use {'{{name}}'}, {'{{email}}'}, {'{{service}}'} as merge tags</p>
                  </div>
                </>
              )}
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">A/B Testing (Optional)</h4>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Variant B Subject</label>
                  <input type="text" value={form.ab_variant_b_subject} onChange={(e) => setForm({ ...form, ab_variant_b_subject: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500 mb-2" />
                  <label className="block text-xs text-gray-400 mb-1">Variant B Body</label>
                  <textarea value={form.ab_variant_b_body} onChange={(e) => setForm({ ...form, ab_variant_b_body: e.target.value })} rows={4} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Workflow Config (JSON)</label>
            <textarea value={form.config} onChange={(e) => setForm({ ...form, config: e.target.value })} rows={6} placeholder='{"steps": [...], "delay_minutes": 30}' className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
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
          <p className="text-gray-400 text-sm mt-1">Email templates, A/B testing, triggers, and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} disabled={campaigns.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export CSV</button>
          <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">+ Create Campaign</button>
        </div>
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
                <tr><th className="p-4">Campaign</th><th className="p-4">Channel</th><th className="p-4">Trigger</th><th className="p-4">Performance</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {campaigns.map((c) => {
                  const openRate = c.sent_count > 0 ? ((c.open_count / c.sent_count) * 100).toFixed(1) : null;
                  const hasAB = c.ab_variant_b_subject || c.ab_variant_b_body;
                  return (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white">{c.name}</div>
                        {hasAB && <span className="text-[10px] text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded ml-1">A/B</span>}
                      </td>
                      <td className="p-4 text-xs text-cyan-400">{c.channel}</td>
                      <td className="p-4 text-xs text-gray-400">{c.trigger_event}</td>
                      <td className="p-4 text-xs text-gray-400">
                        {c.sent_count > 0 ? (
                          <span>{c.sent_count} sent / {openRate}% open / {c.conversion_count || 0} conv</span>
                        ) : <span className="text-gray-500">—</span>}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'active' ? 'bg-emerald-950/70 text-emerald-400' : c.status === 'paused' ? 'bg-amber-950/70 text-amber-400' : c.status === 'completed' ? 'bg-blue-950/70 text-blue-400' : 'bg-slate-700 text-gray-400'}`}>{c.status}</span>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => handleEdit(c)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(c.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingAutomation;
