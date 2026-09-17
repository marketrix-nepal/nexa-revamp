import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Layers, 
  Globe, 
  Activity, 
  ShieldCheck, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
  const { user, logout, role } = useAuth();

  const navItems = [
    { id: 'crm', label: 'CRM & Pipeline', icon: Users, roleReq: ['STRATEGIC_CONSULTANT', 'SUPER_ADMIN'] },
    { id: 'ecosystem', label: '8-Pillars CMS', icon: Layers, roleReq: ['CREATIVE_EDITOR', 'SUPER_ADMIN'] },
    { id: 'discovery', label: 'Discovery Suite', icon: Globe, roleReq: ['CREATIVE_EDITOR', 'SUPER_ADMIN'] },
    { id: 'automation', label: 'Automation & Logs', icon: Activity, roleReq: ['TECH_ENGINEER', 'SUPER_ADMIN'] },
    { id: 'governance', label: 'System Governance', icon: ShieldCheck, roleReq: ['SUPER_ADMIN'] }
  ];

  return (
    <aside className="admin-sidebar">
      {/* Brand Lockup */}
      <div className="sidebar-brand-header">
        <img 
          src="/logo.png" 
          alt="NEXA GROWTH" 
          className="sidebar-logo-img" 
        />
        <span className="sidebar-badge">OPS CONSOLE</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Operator Profile & Return */}
      <div className="sidebar-footer">
        <div className="operator-profile-card">
          <div className="operator-avatar">
            {user?.name ? user.name[0].toUpperCase() : 'O'}
          </div>
          <div className="operator-info">
            <div className="operator-name">{user?.name || 'Operator'}</div>
            <div className="operator-role">{user?.role || 'SUPER_ADMIN'}</div>
          </div>
        </div>

        <button 
          onClick={logout} 
          className="btn-admin btn-admin-secondary" 
          style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
        >
          <LogOut size={14} />
          <span>Exit Session</span>
        </button>

        <a href="/" className="sidebar-return-link">
          <span>← Return to Public Website</span>
        </a>
      </div>
    </aside>
  );
}
