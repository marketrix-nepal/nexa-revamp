import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export function LoginView() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@nexagrowth.com');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const presets = [
    { role: 'SUPER_ADMIN', email: 'admin@nexagrowth.com', title: 'Super Administrator', desc: 'Unrestricted access across CRM, CMS, Discovery, and System Governance.' },
    { role: 'STRATEGIC_CONSULTANT', email: 'strategy@nexagrowth.com', title: 'Strategic Consultant', desc: 'Manage inbound client diagnostics and mutate 6-step Kanban stages.' },
    { role: 'CREATIVE_EDITOR', email: 'creative@nexagrowth.com', title: 'Creative Editor', desc: 'Edit the 8 Ecosystem Pillars and Discovery/SEO metadata.' },
    { role: 'TECH_ENGINEER', email: 'engineer@nexagrowth.com', title: 'Tech Engineer', desc: 'Monitor AutomationLogs, Webhook health, and trigger retries.' }
  ];

  async function handleLogin(e) {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email);
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  }

  async function handlePreset(role, presetEmail) {
    setError('');
    setLoading(true);
    try {
      await login(presetEmail, role);
    } catch (err) {
      setError(err.message || 'Preset login error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'radial-gradient(circle at top center, rgba(229, 25, 45, 0.08) 0%, #020305 70%)' }}>
      <div style={{ width: '100%', maxWidth: '520px', background: 'var(--admin-bg-card)', border: '1px solid var(--admin-border-strong)', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/logo.png" 
            alt="NEXA GROWTH" 
            style={{ height: '48px', width: 'auto', marginBottom: '1rem' }} 
          />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: '#FFFFFF' }}>
            Operational Console Gateway
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', margin: 0 }}>
            Restricted operational environment for strategy, technology & growth engineering.
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-crimson-dim)', border: '1px solid var(--admin-crimson)', borderRadius: 'var(--admin-radius)', color: varAdminCrimson, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Email Direct Input */}
        <form onSubmit={handleLogin} style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.4rem' }}>
              AUTHORIZED OPERATOR EMAIL
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              placeholder="operator@nexagrowth.com"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-admin btn-admin-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
          >
            <span>{loading ? 'Authenticating Gateway...' : 'Enter Operational Console'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick RBAC Role Presets */}
        <div style={{ borderTop: '1px solid var(--admin-border-subtle)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <UserCheck size={14} color="var(--admin-amber)" />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ONE-CLICK RBAC DEMO PRESETS
            </span>
          </div>

          <div className="login-presets-grid">
            {presets.map((p) => (
              <button
                key={p.role}
                onClick={() => handlePreset(p.role, p.email)}
                className="login-preset-btn"
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', lineHeight: 1.3 }}>
                  {p.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <a href="/" style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', textDecoration: 'none' }}>
            ← Return to Public Experience
          </a>
        </div>

      </div>
    </div>
  );
}

const varAdminCrimson = '#E5192D';
