import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  Search,
  Settings as SettingsIcon,
  Zap
} from 'lucide-react';
import { connectRealtime } from '../socket';

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: Activity },
  { to: '/leads', label: 'Leads', icon: Mail },
  { to: '/seo', label: 'SEO Engine', icon: Search },
  { to: '/global', label: 'Global Reach', icon: Globe2 },
  { to: '/settings', label: 'Settings', icon: SettingsIcon }
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [liveCount, setLiveCount] = useState(0);
  const [pulse, setPulse] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('aura_token');
    const socket = connectRealtime(token, {
      onHit: (hit) => {
        setPulse(`${hit.country} · ${hit.path}`);
        setLiveCount((n) => n + 0);
      },
      onLead: () => setPulse('New lead received')
    });

    const poll = async () => {
      try {
        const { default: api } = await import('../api');
        const { data } = await api.get('/api/admin/live');
        setLiveCount(data.visitors?.length || 0);
      } catch {
        /* ignore */
      }
    };
    poll();
    const id = setInterval(poll, 12000);
    return () => {
      clearInterval(id);
      socket.disconnect();
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('aura_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-line p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan to-violet grid place-items-center">
            <Zap size={18} />
          </div>
          <div>
            <p className="font-extrabold tracking-tight">AURA Command</p>
            <p className="text-xs text-white/50">Realtime ops</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                  isActive ? 'bg-white/10 text-cyan' : 'text-white/70 hover:bg-white/5'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white mt-6"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b border-line px-4 md:px-8 py-4">
          <div>
            <p className="text-sm text-white/50">AURA Digital · auraofficial.in</p>
            <p className="text-xs text-cyan h-4">{pulse || 'Listening for live events'}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {liveCount} live
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
