import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import api from './api';
import Layout from './components/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Leads from './pages/Leads';
import SeoCenter from './pages/SeoCenter';
import GlobalReach from './pages/GlobalReach';
import Settings from './pages/Settings';

function Guard({ children }) {
  const [ok, setOk] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('aura_token');
    if (!token) {
      setOk(false);
      return;
    }
    api.get('/api/auth/me')
      .then(() => setOk(true))
      .catch(() => setOk(false));
  }, []);
  if (ok === null) {
    return <div className="min-h-screen grid place-items-center text-cyan">Loading command center…</div>;
  }
  return ok ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Guard>
            <Layout>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/seo" element={<SeoCenter />} />
                <Route path="/global" element={<GlobalReach />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </Guard>
        }
      />
    </Routes>
  );
}
