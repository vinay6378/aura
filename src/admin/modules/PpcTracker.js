import React, { useState, useEffect, useCallback } from 'react';
import { getPpcCampaigns, upsertPpcCampaign, deletePpcCampaign, getPpcClicks, markPpcConversion, exportToCsv } from '../../services/adminDataService';

const PLATFORMS = ['google', 'facebook', 'instagram', 'linkedin', 'twitter', 'other'];

const PpcTracker = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', platform: 'google', source: '', medium: '', campaign_id: '', budget: 0, spend: 0, currency: 'INR', target_geo: 'IN', budget_alert_threshold: 80, is_active: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showClicks, setShowClicks] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cmps, cls] = await Promise.all([getPpcCampaigns(), getPpcClicks()]);
      setCampaigns(cmps);
      setClicks(cls);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, platform: c.platform, source: c.source, medium: c.medium, campaign_id: c.campaign_id, budget: c.budget, spend: c.spend || 0, currency: c.currency || 'INR', target_geo: c.target_geo || 'IN', budget_alert_threshold: c.budget_alert_threshold || 80, is_active: c.is_active, id: c.id });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ name: '', platform: 'google', source: '', medium: '', campaign_id: '', budget: 0, spend: 0, currency: 'INR', target_geo: 'IN', budget_alert_threshold: 80, is_active: true });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await upsertPpcCampaign(form);
      setEditing(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this campaign and all its click data?')) return;
    try {
      await deletePpcCampaign(id);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkConversion = async (clickId) => {
    try {
      await markPpcConversion(clickId);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExportClicks = () => {
    exportToCsv(`ppc_clicks_${new Date().toISOString().split('T')[0]}.csv`, clicks);
  };

  const campaignClicks = (cmpId) => clicks.filter((c) => c.campaign_id === cmpId);

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading PPC data...</div>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Add PPC Campaign' : 'Edit PPC Campaign'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Campaign Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Platform</label>
              <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Target Geo</label>
              <input type="text" value={form.target_geo} onChange={(e) => setForm({ ...form, target_geo: e.target.value })} placeholder="IN" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Budget ({form.currency})</label>
              <input type="number" step="0.01" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Spend ({form.currency})</label>
              <input type="number" step="0.01" value={form.spend} onChange={(e) => setForm({ ...form, spend: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Currency</label>
              <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Budget Alert Threshold (%)</label>
            <input type="number" step="0.01" min="0" max="100" value={form.budget_alert_threshold} onChange={(e) => setForm({ ...form, budget_alert_threshold: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">Alert when spend reaches this percentage of budget</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">UTM Source</label>
              <input type="text" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="google" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">UTM Medium</label>
              <input type="text" value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} placeholder="cpc" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Campaign ID</label>
              <input type="text" value={form.campaign_id} onChange={(e) => setForm({ ...form, campaign_id: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-cyan-500" />
            Active (tracking clicks)
          </label>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Campaign'}
          </button>
        </form>
      </div>
    );
  }

  const totalClicks = clicks.length;
  const totalConversions = clicks.filter((c) => c.is_conversion).length;
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">PPC & Marketing Tracker</h2>
          <p className="text-gray-400 text-sm mt-1">Click tracking, ROI, budget alerts, and conversion data</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportClicks} disabled={clicks.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export Clicks</button>
          <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">+ Add Campaign</button>
        </div>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-gray-400">Total Clicks</span>
          <p className="text-3xl font-extrabold text-white mt-2">{totalClicks}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-emerald-400">Conversions</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">{totalConversions}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-cyan-400">Total Budget</span>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2">{totalBudget.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs uppercase font-semibold text-amber-400">Total Spend</span>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">{totalSpend.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No PPC campaigns yet. Click "Add Campaign" to start tracking clicks and conversions.
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((c) => {
            const cClicks = campaignClicks(c.id);
            const cConversions = cClicks.filter((cl) => cl.is_conversion).length;
            const ctr = cClicks.length > 0 ? ((cConversions / cClicks.length) * 100).toFixed(1) : '0.0';
            const cpc = cClicks.length > 0 && c.spend > 0 ? (c.spend / cClicks.length).toFixed(2) : '0.00';
            const costPerConv = cConversions > 0 && c.spend > 0 ? (c.spend / cConversions).toFixed(2) : '0.00';
            const budgetUsed = c.budget > 0 ? ((c.spend / c.budget) * 100).toFixed(1) : '0.0';
            const overBudget = c.budget > 0 && c.spend >= c.budget * (c.budget_alert_threshold / 100);

            return (
              <div key={c.id} className={`bg-slate-900 border rounded-2xl p-5 ${overBudget ? 'border-amber-600/60' : 'border-slate-800'}`}>
                {overBudget && (
                  <div className="mb-3 p-2 bg-amber-950/40 border border-amber-700/50 rounded-lg text-xs text-amber-400">
                    Budget Alert: {budgetUsed}% of budget spent ({c.currency} {c.spend.toLocaleString('en-IN')} / {c.budget.toLocaleString('en-IN')})
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{c.name}</h3>
                    <div className="flex gap-3 text-xs text-gray-400 mt-1 flex-wrap">
                      <span>Platform: <span className="text-cyan-400">{c.platform}</span></span>
                      <span>Geo: <span className="text-cyan-400">{c.target_geo}</span></span>
                      <span>Clicks: <span className="text-white">{cClicks.length}</span></span>
                      <span>Conv: <span className="text-emerald-400">{cConversions}</span></span>
                      <span>CTR: <span className="text-white">{ctr}%</span></span>
                      <span>CPC: <span className="text-white">{c.currency} {cpc}</span></span>
                      <span>Cost/Conv: <span className="text-white">{c.currency} {costPerConv}</span></span>
                      <span>Budget: <span className={overBudget ? 'text-amber-400' : 'text-white'}>{budgetUsed}% used</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? 'bg-emerald-950/70 text-emerald-400' : 'bg-slate-700 text-gray-400'}`}>{c.is_active ? 'Active' : 'Inactive'}</span>
                    <button onClick={() => handleEdit(c)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(c.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                    <button onClick={() => setShowClicks(showClicks === c.id ? null : c.id)} className="text-xs text-gray-400 hover:text-white">{showClicks === c.id ? 'Hide' : 'View'} Clicks</button>
                  </div>
                </div>
                {c.budget > 0 && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                    <div className={`h-full rounded-full transition-all ${overBudget ? 'bg-amber-500' : 'bg-cyan-500'}`} style={{ width: `${Math.min(100, budgetUsed)}%` }} />
                  </div>
                )}
                {showClicks === c.id && (
                  <div className="mt-4 border-t border-slate-800 pt-4">
                    {cClicks.length === 0 ? (
                      <p className="text-gray-500 text-xs">No clicks recorded yet.</p>
                    ) : (
                      <div className="space-y-1 max-h-48 overflow-auto">
                        {cClicks.map((cl) => (
                          <div key={cl.id} className="flex justify-between items-center text-xs py-1.5 px-2 hover:bg-slate-800/40 rounded">
                            <div className="flex gap-3">
                              <span className="text-gray-300">{new Date(cl.created_at).toLocaleString()}</span>
                              <span className="text-gray-500">{cl.path}</span>
                              <span className="text-gray-500">{cl.utm_source}/{cl.utm_medium}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={cl.is_conversion ? 'text-emerald-400' : 'text-gray-500'}>{cl.is_conversion ? 'Converted' : 'Click'}</span>
                              {!cl.is_conversion && <button onClick={() => handleMarkConversion(cl.id)} className="text-cyan-400 hover:underline">Mark Conversion</button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PpcTracker;
