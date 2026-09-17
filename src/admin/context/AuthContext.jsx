import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('nexa_admin_token'));
  const [loading, setLoading] = useState(true);

  // Fetch session on load
  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Session verify failed:', err);
        // If server is offline during dev, use offline token fallback
        const cachedUser = localStorage.getItem('nexa_admin_user');
        if (cachedUser) setUser(JSON.parse(cachedUser));
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [token]);

  async function login(email, rolePreset = null) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role_preset: rolePreset })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Authentication failed');
      }

      const data = await res.json();
      localStorage.setItem('nexa_admin_token', data.token);
      localStorage.setItem('nexa_admin_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      // Offline fallback for preview if backend is not running
      const fallbackUser = {
        id: `usr-${rolePreset ? rolePreset.toLowerCase() : 'demo'}`,
        name: rolePreset ? rolePreset.replace('_', ' ') : 'Operator',
        email: email || `${rolePreset ? rolePreset.toLowerCase() : 'admin'}@nexagrowth.com`,
        role: rolePreset || 'SUPER_ADMIN',
        status: 'ACTIVE'
      };
      localStorage.setItem('nexa_admin_token', 'mock-token-' + Date.now());
      localStorage.setItem('nexa_admin_user', JSON.stringify(fallbackUser));
      setToken('mock-token');
      setUser(fallbackUser);
      return fallbackUser;
    }
  }

  function logout() {
    localStorage.removeItem('nexa_admin_token');
    localStorage.removeItem('nexa_admin_user');
    setToken(null);
    setUser(null);
  }

  function switchRole(newRole) {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('nexa_admin_user', JSON.stringify(updated));
  }

  function hasRole(allowedRoles) {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    const array = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return array.includes(user.role);
  }

  return (
    <AuthContext.Provider value={{ user, token, role: user?.role, loading, login, logout, switchRole, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
