import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState('');

  useEffect(() => {
    api.get('/api/admin/settings').then(({ data }) => setSettings(data.settings || {}));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put('/api/admin/settings', settings);
    setSaved('Saved');
    setTimeout(() => setSaved(''), 2000);
  };

  const field = (key, label) => (
    <label key={key} className="block text-sm">
      {label}
      <input
        className="mt-1 w-full rounded-xl bg-black/40 border border-line px-3 py-2"
        value={settings[key] || ''}
        onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
      />
    </label>
  );

  return (
    <form onSubmit={save} className="max-w-xl space-y-4">
      <h1 className="text-2xl font-extrabold">Settings</h1>
      {field('siteName', 'Site name')}
      {field('siteUrl', 'Public site URL')}
      {field('contactEmail', 'Contact email')}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={settings.trackingEnabled !== 'false'}
          onChange={(e) => setSettings({ ...settings, trackingEnabled: e.target.checked ? 'true' : 'false' })}
        />
        Public analytics tracking enabled
      </label>
      <button className="rounded-xl bg-cyan text-ink font-semibold px-5 py-2">Save</button>
      {saved && <span className="ml-3 text-emerald-400 text-sm">{saved}</span>}
    </form>
  );
}
