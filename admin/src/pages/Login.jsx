import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@auraofficial.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('aura_token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form onSubmit={submit} className="card w-full max-w-md p-8 space-y-5">
        <div>
          <p className="text-cyan text-sm font-semibold">AURA COMMAND</p>
          <h1 className="text-3xl font-extrabold mt-1">Sign in</h1>
          <p className="text-white/50 text-sm mt-2">Realtime analytics, leads, and global SEO control.</p>
        </div>
        <label className="block text-sm">
          Email
          <input
            className="mt-1 w-full rounded-xl bg-black/40 border border-line px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            className="mt-1 w-full rounded-xl bg-black/40 border border-line px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-cyan to-violet py-2.5 font-semibold text-ink"
        >
          {loading ? 'Signing in…' : 'Enter command center'}
        </button>
      </form>
    </div>
  );
}
