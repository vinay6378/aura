import React, { useState, useEffect, useCallback } from 'react';
import { getSocialPosts, upsertSocialPost, deleteSocialPost } from '../../services/adminDataService';

const PLATFORMS = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'other'];
const STATUSES = ['draft', 'scheduled', 'published', 'failed'];

const SocialMediaAutomation = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ platform: 'linkedin', content: '', media_url: '', scheduled_at: '', status: 'draft', post_url: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSocialPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleEdit = (p) => {
    setEditing(p);
    const scheduled = p.scheduled_at ? new Date(p.scheduled_at).toISOString().slice(0, 16) : '';
    setForm({ platform: p.platform, content: p.content, media_url: p.media_url || '', scheduled_at: scheduled, status: p.status, post_url: p.post_url || '', id: p.id });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ platform: 'linkedin', content: '', media_url: '', scheduled_at: '', status: 'draft', post_url: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null };
      await upsertSocialPost(payload);
      setEditing(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this social post?')) return;
    try {
      await deleteSocialPost(id);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-emerald-950/70 text-emerald-400';
      case 'scheduled': return 'bg-cyan-950/70 text-cyan-400';
      case 'failed': return 'bg-rose-950/70 text-rose-400';
      default: return 'bg-slate-700 text-gray-400';
    }
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading social posts...</div>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Schedule Post' : 'Edit Post'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Platform *</label>
            <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required placeholder="Write your post content..." className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Media URL (optional)</label>
            <input type="text" value={form.media_url} onChange={(e) => setForm({ ...form, media_url: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Schedule For</label>
              <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Published Post URL (optional)</label>
            <input type="text" value={form.post_url} onChange={(e) => setForm({ ...form, post_url: e.target.value })} placeholder="https://linkedin.com/posts/..." className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Social Media Automation</h2>
          <p className="text-gray-400 text-sm mt-1">Schedule and manage social media posts</p>
        </div>
        <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">
          + Schedule Post
        </button>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}
      {posts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No social posts yet. Click "Schedule Post" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase">{p.platform}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(p.status)}`}>{p.status}</span>
                  {p.scheduled_at && (
                    <span className="text-xs text-gray-400">Scheduled: {new Date(p.scheduled_at).toLocaleString()}</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(p)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{p.content}</p>
              {p.media_url && <p className="text-xs text-gray-500 mt-2">Media: {p.media_url}</p>}
              {p.post_url && <a href={p.post_url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline mt-2 inline-block">View published post</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaAutomation;
