// Authentication utilities

const AUTH_KEY = 'aura_admin_auth';
const SESSION_KEY = 'aura_admin_session';

export const login = (username, password) => {
  // Use environment variables for production credentials
  const envUsername = process.env.REACT_APP_ADMIN_USERNAME || '@auratechai@gmail.com';
  const envPassword = process.env.REACT_APP_ADMIN_PASSWORD || '@x0sb1kkh3k';

  // Validate credentials
  if (username === envUsername && password === envPassword) {
    const session = {
      username,
      role: 'admin',
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(AUTH_KEY, btoa(JSON.stringify(session))); // Simple encoding (not secure for production)
    return { success: true, user: session };
  }

  return { success: false, error: 'Invalid credentials' };
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(AUTH_KEY);
  return { success: true };
};

export const isAuthenticated = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;

  try {
    const sessionData = JSON.parse(session);
    const expiresAt = new Date(sessionData.expiresAt);
    
    if (new Date() > expiresAt) {
      logout();
      return false;
    }
    
    return true;
  } catch {
    logout();
    return false;
  }
};

export const getCurrentUser = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
};

export const requireAuth = (navigate) => {
  if (!isAuthenticated()) {
    navigate('/admin/login');
    return false;
  }
  return true;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (requiredRole === 'admin') {
    return user.role === 'admin';
  }
  
  return true; // Editors and viewers can access most things
};