import React, { useState, useEffect, useCallback } from 'react';
import { getSeoPages, upsertSeoPage, deleteSeoPage, exportToCsv } from '../../services/adminDataService';

function calculateSeoScore(page) {
  if (!page) return { score: 0, checks: [] };
  const checks = [];
  let passed = 0;

  const title = page.title || '';
  const desc = page.description || '';
  const kw = page.focus_keyword || '';
  const canonical = page.canonical_url || '';
  const ogImage = page.og_image || '';
  const schema = page.schema_json;

  if (title.length >= 30 && title.length <= 60) { checks.push({ label: 'Title length (30-60 chars)', ok: true }); passed++; }
  else { checks.push({ label: `Title length should be 30-60 chars (currently ${title.length})`, ok: false }); }

  if (desc.length >= 120 && desc.length <= 160) { checks.push({ label: 'Description length (120-160 chars)', ok: true }); passed++; }
  else { checks.push({ label: `Description should be 120-160 chars (currently ${desc.length})`, ok: false }); }

  if (kw && title.toLowerCase().includes(kw.toLowerCase())) { checks.push({ label: 'Focus keyword in title', ok: true }); passed++; }
  else if (kw) { checks.push({ label: 'Focus keyword not in title', ok: false }); }
  else { checks.push({ label: 'No focus keyword set', ok: false }); }

  if (kw && desc.toLowerCase().includes(kw.toLowerCase())) { checks.push({ label: 'Focus keyword in description', ok: true }); passed++; }
  else if (kw) { checks.push({ label: 'Focus keyword not in description', ok: false }); }
  else { checks.push({ label: 'No focus keyword in description', ok: false }); }

  if (canonical) { checks.push({ label: 'Canonical URL set', ok: true }); passed++; }
  else { checks.push({ label: 'No canonical URL', ok: false }); }

  if (ogImage) { checks.push({ label: 'OG image set', ok: true }); passed++; }
  else { checks.push({ label: 'No OG image', ok: false }); }

  if (schema) { checks.push({ label: 'Schema.org structured data', ok: true }); passed++; }
  else { checks.push({ label: 'No schema.org data', ok: false }); }

  if (page.is_indexed !== false) { checks.push({ label: 'Page is indexable', ok: true }); passed++; }
  else { checks.push({ label: 'Page is set to noindex', ok: false }); }

  const score = Math.round((passed / checks.length) * 100);
  return { score, checks };
}

const SeoManagement = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkPages, setBulkPages] = useState({});
  const [form, setForm] = useState({ path: '', title: '', description: '', keywords: '', focus_keyword: '', og_image: '', og_title: '', canonical_url: '', is_indexed: true, schema_json: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [seoScore, setSeoScore] = useState(null);

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

  useEffect(() => {
    if (editing && editing !== 'new') {
      setSeoScore(calculateSeoScore(form));
    } else {
      setSeoScore(null);
    }
  }, [form, editing]);

  const handleEdit = (page) => {
    setEditing(page);
    setForm({
      path: page.path,
      title: page.title || '',
      description: page.description || '',
      keywords: page.keywords || '',
      focus_keyword: page.focus_keyword || '',
      og_image: page.og_image || '',
      og_title: page.og_title || '',
      canonical_url: page.canonical_url || '',
      is_indexed: page.is_indexed !== false,
      schema_json: page.schema_json ? JSON.stringify(page.schema_json, null, 2) : ''
    });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ path: '', title: '', description: '', keywords: '', focus_keyword: '', og_image: '', og_title: '', canonical_url: '', is_indexed: true, schema_json: '' });
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
        focus_keyword: form.focus_keyword,
        og_image: form.og_image,
        og_title: form.og_title,
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

  const handleExport = () => {
    exportToCsv(`seo_pages_${new Date().toISOString().split('T')[0]}.csv`, pages);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const text = ev.target.result;
        const lines = text.split('\n').filter((l) => l.trim());
        if (lines.length < 2) return;
        const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, ''));
        for (let i = 1; i < lines.length; i++) {
          const values = [];
          let inQuote = false, current = '';
          for (const ch of lines[i]) {
            if (ch === '"') inQuote = !inQuote;
            else if (ch === ',' && !inQuote) { values.push(current); current = ''; }
            else current += ch;
          }
          values.push(current);
          const row = {};
          headers.forEach((h, idx) => { row[h] = values[idx]?.replace(/^"|"$/g, '') || ''; });
          await upsertSeoPage({ path: row.path, title: row.title, description: row.description, keywords: row.keywords, canonical_url: row.canonical_url, is_indexed: row.is_indexed !== 'false' });
        }
        fetchPages();
      } catch {
        setError('Failed to import CSV');
      }
    };
    reader.readAsText(file);
  };

  const handleBulkSave = async () => {
    setSaving(true);
    setError('');
    try {
      for (const [path, updates] of Object.entries(bulkPages)) {
        const existing = pages.find((p) => p.path === path);
        if (existing) {
          await upsertSeoPage({ ...existing, ...updates, schema_json: existing.schema_json });
        }
      }
      setBulkMode(false);
      setBulkPages({});
      fetchPages();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const toggleBulkPage = (path, field, value) => {
    setBulkPages((prev) => ({
      ...prev,
      [path]: { ...prev[path], [field]: value }
    }));
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading SEO data...</div>;

  if (editing) {
    const googlePreviewUrl = form.canonical_url || `https://auraofficial.in${form.path || ''}`;
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Add SEO Page' : 'Edit SEO Page'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

        {/* SERP Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Google Search Preview</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="text-xs text-green-700 mb-1">{googlePreviewUrl}</div>
            <div className="text-xl text-blue-700 hover:underline cursor-pointer truncate">{form.title || 'Page Title'}</div>
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{form.description || 'Page description will appear here...'}</div>
          </div>
        </div>

        {/* SEO Score */}
        {seoScore && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-3xl font-extrabold ${seoScore.score >= 70 ? 'text-emerald-400' : seoScore.score >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                {seoScore.score}
              </div>
              <div>
                <span className="text-sm text-gray-400">SEO Score</span>
                <p className="text-xs text-gray-500">{seoScore.checks.filter((c) => c.ok).length}/{seoScore.checks.length} checks passed</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {seoScore.checks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={check.ok ? 'text-emerald-400' : 'text-rose-400'}>{check.ok ? '[PASS]' : '[FAIL]'}</span>
                  <span className="text-gray-300">{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Page Path *</label>
            <input type="text" required value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} placeholder="/about" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Focus Keyword</label>
            <input type="text" value={form.focus_keyword} onChange={(e) => setForm({ ...form, focus_keyword: e.target.value })} placeholder="digital marketing india" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">Used for SEO scoring — put your target keyword here</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">{form.title.length}/60 characters</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Meta Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">{form.description.length}/160 characters</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Keywords (comma-separated)</label>
            <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">OG Title</label>
            <input type="text" value={form.og_title} onChange={(e) => setForm({ ...form, og_title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
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

  if (bulkMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Bulk Edit SEO Pages</h2>
          <div className="flex gap-3">
            <button onClick={() => { setBulkMode(false); setBulkPages({}); }} className="text-xs text-gray-400 hover:text-white">Cancel</button>
            <button onClick={handleBulkSave} disabled={saving} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg disabled:opacity-50">
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
              <tr><th className="p-3">Path</th><th className="p-3">Title</th><th className="p-3">Description</th><th className="p-3">Indexed</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pages.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-mono text-cyan-400 text-xs">{p.path}</td>
                  <td className="p-3"><input type="text" defaultValue={p.title} onChange={(e) => toggleBulkPage(p.path, 'title', e.target.value)} className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white text-xs" /></td>
                  <td className="p-3"><input type="text" defaultValue={p.description} onChange={(e) => toggleBulkPage(p.path, 'description', e.target.value)} className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white text-xs" /></td>
                  <td className="p-3"><input type="checkbox" defaultChecked={p.is_indexed} onChange={(e) => toggleBulkPage(p.path, 'is_indexed', e.target.checked)} className="accent-cyan-500" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">SEO Management</h2>
          <p className="text-gray-400 text-sm mt-1">Meta tags, schema, SERP preview, and SEO scoring</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} disabled={pages.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export CSV</button>
          <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={() => setBulkMode(true)} disabled={pages.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Bulk Edit</button>
          <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">+ Add Page</button>
        </div>
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
                <tr><th className="p-4">Path</th><th className="p-4">Title</th><th className="p-4">Description</th><th className="p-4">Keyword</th><th className="p-4">Indexed</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {pages.map((p) => {
                  const score = calculateSeoScore(p);
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono text-cyan-400">{p.path}</td>
                      <td className="p-4 text-white text-xs">{p.title || <span className="text-gray-500">—</span>}</td>
                      <td className="p-4 text-xs text-gray-400 max-w-xs truncate">{p.description || <span className="text-gray-500">—</span>}</td>
                      <td className="p-4 text-xs text-gray-300">{p.focus_keyword || <span className="text-gray-500">—</span>}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_indexed ? 'bg-emerald-950/70 text-emerald-400' : 'bg-rose-950/70 text-rose-400'}`}>{p.is_indexed ? 'Yes' : 'No'}</span>
                          <span className={`text-xs font-bold ${score.score >= 70 ? 'text-emerald-400' : score.score >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>{score.score}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => handleEdit(p)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
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

export default SeoManagement;
