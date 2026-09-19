import React, { useState, useEffect, useCallback } from 'react';
import { getSocialPosts, upsertSocialPost, deleteSocialPost, exportToCsv } from '../../services/adminDataService';

const PLATFORMS = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'other'];
const STATUSES = ['draft', 'scheduled', 'published', 'failed'];

const HASHTAG_SUGGESTIONS = {
  linkedin: ['#DigitalMarketing', '#WebDevelopment', '#Branding', '#BusinessGrowth', '#TechIndia'],
  twitter: ['#DigitalMarketing', '#WebDev', '#Startups', '#IndiaBusiness', '#MarketingTips'],
  facebook: ['#DigitalMarketing', '#BusinessGrowth', '#WebDesign', '#SocialMediaMarketing'],
  instagram: ['#digitalmarketing', '#webdevelopment', '#branding', '#graphicdesign', '#socialmediamarketing', '#businessgrowth', '#startupindia', '#techindia'],
  youtube: ['#DigitalMarketing', '#WebDevelopment', '#Tutorial', '#TechTips', '#BusinessGrowth'],
  other: ['#DigitalMarketing', '#WebDevelopment', '#BusinessGrowth']
};

const SocialMediaAutomation = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [view, setView] = useState('list');
  const [form, setForm] = useState({ platform: 'linkedin', content: '', media_url: '', scheduled_at: '', status: 'draft', post_url: '', hashtags: '' });
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
    setForm({ platform: p.platform, content: p.content, media_url: p.media_url || '', scheduled_at: scheduled, status: p.status, post_url: p.post_url || '', hashtags: p.hashtags || '', id: p.id });
  };

  const handleNew = () => {
    setEditing('new');
    setForm({ platform: 'linkedin', content: '', media_url: '', scheduled_at: '', status: 'draft', post_url: '', hashtags: '' });
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

  const handleExport = () => {
    const rows = posts.map((p) => ({
      platform: p.platform, content: p.content?.slice(0, 100), status: p.status,
      scheduled_at: p.scheduled_at || '', likes: p.likes || 0, comments: p.comments || 0,
      shares: p.shares || 0, reach: p.reach || 0
    }));
    exportToCsv(`social_posts_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  const addHashtag = (tag) => {
    const current = form.hashtags ? form.hashtags.split(' ').filter(Boolean) : [];
    if (!current.includes(tag)) {
      setForm({ ...form, hashtags: [...current, tag].join(' ') });
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

  const getPlatformColor = (platform) => {
    const colors = { linkedin: 'text-blue-400', twitter: 'text-sky-400', facebook: 'text-blue-500', instagram: 'text-pink-400', youtube: 'text-red-400' };
    return colors[platform] || 'text-gray-400';
  };

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading social posts...</div>;

  if (editing) {
    const suggestions = HASHTAG_SUGGESTIONS[form.platform] || [];
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? 'Schedule Post' : 'Edit Post'}</h2>
          <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
        </div>
        {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

        {/* Live Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Post Preview</h3>
          <div className="bg-white rounded-xl p-4 text-black">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">AD</div>
              <div>
                <div className="font-semibold text-sm">AURA Digital</div>
                <div className="text-xs text-gray-500">{form.platform} · just now</div>
              </div>
            </div>
            <p className="text-sm whitespace-pre-wrap">{form.content || 'Your post content will appear here...'}</p>
            {form.media_url && <div className="mt-3 rounded-lg overflow-hidden"><img src={form.media_url} alt="preview" className="max-h-48 object-cover" onError={(e) => { e.target.style.display = 'none'; }} /></div>}
            {form.hashtags && <p className="text-sm text-blue-600 mt-2">{form.hashtags}</p>}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Platform *</label>
            <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value, hashtags: '' })} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required placeholder="Write your post content..." className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <p className="text-xs text-gray-500 mt-1">{form.content.length} characters</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1.5">Hashtags</label>
            <input type="text" value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} placeholder="#digitalmarketing #webdev" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500" />
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestions.map((tag) => (
                <button key={tag} type="button" onClick={() => addHashtag(tag)} className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-2 py-1 rounded-full transition">{tag}</button>
              ))}
            </div>
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

  const publishedPosts = posts.filter((p) => p.status === 'published');
  const totalEngagement = publishedPosts.reduce((sum, p) => sum + (p.likes || 0) + (p.comments || 0) + (p.shares || 0), 0);
  const totalReach = publishedPosts.reduce((sum, p) => sum + (p.reach || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Social Media Automation</h2>
          <p className="text-gray-400 text-sm mt-1">Schedule posts, content calendar, hashtag suggestions, and analytics</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView(view === 'list' ? 'calendar' : 'list')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg">{view === 'list' ? 'Calendar View' : 'List View'}</button>
          <button onClick={handleExport} disabled={posts.length === 0} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">Export CSV</button>
          <button onClick={handleNew} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition">+ Schedule Post</button>
        </div>
      </div>
      {error && <div className="p-3 text-sm text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg">{error}</div>}

      {publishedPosts.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs uppercase font-semibold text-gray-400">Total Reach</span>
            <p className="text-2xl font-extrabold text-white mt-2">{totalReach.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs uppercase font-semibold text-cyan-400">Total Engagement</span>
            <p className="text-2xl font-extrabold text-cyan-400 mt-2">{totalEngagement.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs uppercase font-semibold text-emerald-400">Published</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-2">{publishedPosts.length}</p>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No social posts yet. Click "Schedule Post" to create one.
        </div>
      ) : view === 'calendar' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase pb-2">{day}</div>
            ))}
            {(() => {
              const now = new Date();
              const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
              const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
              const startOffset = firstDay.getDay();
              const days = [];
              for (let i = 0; i < startOffset; i++) days.push(null);
              for (let d = 1; d <= lastDay.getDate(); d++) {
                const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dayPosts = posts.filter((p) => p.scheduled_at?.slice(0, 10) === dateStr);
                days.push({ day: d, posts: dayPosts });
              }
              return days.map((d, i) => (
                <div key={i} className="min-h-20 bg-slate-800/40 rounded-lg p-1.5 border border-slate-800">
                  {d && (
                    <>
                      <div className="text-xs text-gray-400 mb-1">{d.day}</div>
                      {d.posts.map((p) => (
                        <div key={p.id} onClick={() => handleEdit(p)} className={`text-[10px] px-1.5 py-1 rounded mb-1 cursor-pointer truncate ${getPlatformColor(p.platform)} bg-slate-800 hover:bg-slate-700`}>
                          {p.platform}: {p.content?.slice(0, 20)}...
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-mono uppercase font-bold ${getPlatformColor(p.platform)}`}>{p.platform}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(p.status)}`}>{p.status}</span>
                  {p.scheduled_at && <span className="text-xs text-gray-400">Scheduled: {new Date(p.scheduled_at).toLocaleString()}</span>}
                  {p.status === 'published' && (
                    <span className="text-xs text-gray-400">
                      Likes: {p.likes || 0} / Comments: {p.comments || 0} / Reach: {p.reach || 0}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => handleEdit(p)} className="text-xs text-cyan-400 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{p.content}</p>
              {p.hashtags && <p className="text-xs text-cyan-400 mt-2">{p.hashtags}</p>}
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
