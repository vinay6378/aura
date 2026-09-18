import React, { useState, useEffect, useCallback } from 'react';
import { getSeoPages, upsertSeoPage, deleteSeoPage } from '../../services/adminDataService';

const SeoManagement = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ path: '', title: '', description: '', keywords: '', og_image: '', canonical_url: '', is_indexed: true, schema_json: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSeoPages();
      setPages(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const handleEdit = (page) => {
    setEditing(page);
    setForm({
      path: page.path,
      title: page.title || '',
      description: page.description || '',
      keywords: page.keywords || '',
      og_image: page.og_image || '',
      canonical_url: page.canonical_url || '',
      is_indexed: page.is_indexed !== false,
      schema_json: page.schema_json ? JSON.stringify(page.schema_json, null, 2) : ''
    });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ path: '', title: '', description: '', keywords: '', og_image: '', canonical_url: '', is_indexed: true, schema_json: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let schemaJson = null;
      if (form.schema_json.trim()) {
        try { schemaJson = JSON.parse(form.schema_json); }
        catch { throw new Error('Schema JSON is invalid'); }
      }
      await upsertSeoPage({
        path: form.path,
        title: form.title,
        description: form.description,
        keywords: form.keywords,
        og_image: form.og_image,
        canonical_url: form.canonical_url,
        is_indexed: form.is_indexed,
        schema_json: schemaJson
      });
      setEditing(null);
      fetchPages();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this SEO page entry?')) return;
    try {
      await deleteSeoPage(id);
      fetchPages();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading SEO data...</div>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Add SEO Page' : 'Edit SEO Page'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Page Path *</label>
            <input type="text" required value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} placeholder="/about" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Keywords</label>
            <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Canonical URL</label>
            <input type="text" value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">OG Image URL</label>
            <input type="text" value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Schema.org JSON (optional)</label>
            <textarea value={form.schema_json} onChange={(e) => setForm({ ...form, schema_json: e.target.value })} rows={6} placeholder='{"@context":"https://schema.org","@type":"Service",...}' className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={form.is_indexed} onChange={(e) => setForm({ ...form, is_indexed: e.target.checked })} className="accent-cyan-500" />
            Allow search engines to index this page
          </label>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save SEO Page'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">SEO Management</h2>
          <p className="text-gray-400 text-sm mt-1">Manage meta tags, schema, and canonical URLs for each page</p>
        </div>
        <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">
          + Add Page
        </button>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
      {pages.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No SEO page entries yet. Click "Add Page" to configure meta tags for a page.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="p-4">Path</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Indexed</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono text-cyan-400">{p.path}</td>
                    <td className="p-4 text-white text-xs">{p.title || <span className="text-gray-500">—</span>}</td>
                    <td className="p-4 text-xs text-gray-400 max-w-xs truncate">{p.description || <span className="text-gray-500">—</span>}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_indexed ? 'bg-emerald-950/70 text-emerald-400' : 'bg-rose-950/70 text-rose-400'}`}>
                        {p.is_indexed ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => handleEdit(p)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
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

export default SeoManagement;
