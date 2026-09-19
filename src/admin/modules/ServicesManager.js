import React, { useState, useEffect, useCallback } from 'react';
import { getServices, upsertService, deleteService, exportToCsv } from '../../services/adminDataService';

const CATEGORIES = ['general', 'development', 'marketing', 'creative', 'content', 'specialized'];
const ICON_OPTIONS = ['FaCode', 'FaMobile', 'FaPaintBrush', 'FaCamera', 'FaPenNib', 'FaChartLine', 'FaBullhorn', 'FaRocket', 'FaCloud', 'FaDatabase', 'FaPalette', 'FaPrint'];

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ slug: '', title: '', short_desc: '', full_desc: '', icon: '', category: 'general', is_active: true, sort_order: 0, meta_title: '', meta_desc: '', image_url: '', features: '', pricing: '', testimonials: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleEdit = (svc) => {
    setEditing(svc);
    setForm({
      slug: svc.slug, title: svc.title, short_desc: svc.short_desc || '',
      full_desc: svc.full_desc || '', icon: svc.icon || '', category: svc.category || 'general',
      is_active: svc.is_active !== false, sort_order: svc.sort_order || 0,
      meta_title: svc.meta_title || '', meta_desc: svc.meta_desc || '',
      image_url: svc.image_url || '',
      features: svc.features ? (Array.isArray(svc.features) ? svc.features.join('\n') : JSON.stringify(svc.features)) : '',
      pricing: svc.pricing ? JSON.stringify(svc.pricing, null, 2) : '',
      testimonials: svc.testimonials ? JSON.stringify(svc.testimonials, null, 2) : '',
      id: svc.id
    });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ slug: '', title: '', short_desc: '', full_desc: '', icon: '', category: 'general', is_active: true, sort_order: 0, meta_title: '', meta_desc: '', image_url: '', features: '', pricing: '', testimonials: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const features = form.features.split('\n').map((f) => f.trim()).filter(Boolean);
      let pricing = [];
      if (form.pricing.trim()) {
        try { pricing = JSON.parse(form.pricing); }
        catch { throw new Error('Pricing JSON is invalid'); }
      }
      let testimonials = [];
      if (form.testimonials.trim()) {
        try { testimonials = JSON.parse(form.testimonials); }
        catch { throw new Error('Testimonials JSON is invalid'); }
      }
      await upsertService({ ...form, features, pricing, testimonials });
      setEditing(null);
      fetchServices();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExport = () => {
    const rows = services.map((s) => ({
      slug: s.slug, title: s.title, category: s.category, short_desc: s.short_desc,
      is_active: s.is_active, sort_order: s.sort_order, features: JSON.stringify(s.features || []),
      pricing: JSON.stringify(s.pricing || [])
    }));
    exportToCsv(`services_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading services...</div>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Add Service' : 'Edit Service'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Slug *</label>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="website-development" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Short Description</label>
            <input type="text" value={form.short_desc} onChange={(e) => setForm({ ...form, short_desc: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Full Description</label>
            <textarea value={form.full_desc} onChange={(e) => setForm({ ...form, full_desc: e.target.value })} rows={6} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Image URL</label>
            <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">Enter a URL to an image. You can use Pexels or any image hosting service.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Icon (select or type name)</label>
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
              <option value="">No icon</option>
              {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-cyan-500" />
                Active
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Features (one per line)</label>
            <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} placeholder={'React.js\nVue.js\nResponsive Design'} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Pricing Tiers (JSON array)</label>
            <textarea value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} rows={5} placeholder={'[{"name":"Basic","price":"5000","currency":"INR","features":["1 page","Responsive"]}]}'} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Testimonials (JSON array)</label>
            <textarea value={form.testimonials} onChange={(e) => setForm({ ...form, testimonials: e.target.value })} rows={5} placeholder={'[{"name":"Client Name","company":"Company","text":"Great work!","rating":5}]}'} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Title</label>
            <input type="text" value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Description</label>
            <textarea value={form.meta_desc} onChange={(e) => setForm({ ...form, meta_desc: e.target.value })} rows={2} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Dynamic Services</h2>
          <p className="text-gray-400 text-sm mt-1">Manage service offerings with features, pricing, and testimonials</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} disabled={services.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export CSV</button>
          <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">+ Add Service</button>
        </div>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
      {services.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No services yet. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
                <tr><th className="p-4">Service</th><th className="p-4">Category</th><th className="p-4">Features</th><th className="p-4">Pricing</th><th className="p-4">Order</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-semibold text-white">{s.title}</div>
                      <div className="text-xs text-gray-500 font-mono">{s.slug}</div>
                    </td>
                    <td className="p-4 text-xs text-cyan-400">{s.category}</td>
                    <td className="p-4 text-xs text-gray-400">{Array.isArray(s.features) ? s.features.length : 0} items</td>
                    <td className="p-4 text-xs text-gray-400">{Array.isArray(s.pricing) ? s.pricing.length : 0} tiers</td>
                    <td className="p-4 text-xs">{s.sort_order}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_active ? 'bg-emerald-950/70 text-emerald-400' : 'bg-slate-700 text-gray-400'}`}>{s.is_active ? 'Active' : 'Hidden'}</span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => handleEdit(s)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
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

export default ServicesManager;
