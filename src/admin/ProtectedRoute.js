import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState('checking');

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session) {
        setAuthState('authenticated');
      } else {
        const token = localStorage.getItem('aura_admin_token');
        setAuthState(token ? 'authenticated' : 'unauthenticated');
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuthState(session ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (authState === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-gray-400 text-sm">Verifying session...</div>
      </div>
    );
  }

  if (authState !== 'authenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
