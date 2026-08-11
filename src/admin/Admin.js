import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import DataManager from './dataManager';
import { isAuthenticated, logout } from '../utils/auth';

const Admin = () => {
  const [authState, setAuthState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize data
    DataManager.initializeData();
    
    // Check if user is already logged in
    if (isAuthenticated()) {
      setAuthState(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthState(true);
  };

  const handleLogout = () => {
    logout();
    setAuthState(false);
    navigate('/admin/login');
  };

  return (
    <div>
      {authState ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;