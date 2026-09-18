import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Layers, 
  Globe, 
  Activity, 
  ShieldCheck, 
  LogOut, 
  X,
  ExternalLink
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();

  const navGroups = [
    {
      groupTitle: 'COMMERCIAL PIPELINE',
      items: [
        { 
          id: 'crm', 
          label: 'CRM & Pipeline', 
          icon: Users, 
          badge: '4 Leads',
          badgeType: 'warning',
          roleReq: ['STRATEGIC_CONSULTANT', 'SUPER_ADMIN'] 
        }
      ]
    },
    {
      groupTitle: 'CONTENT ARCHITECTURE',
      items: [
        { 
          id: 'ecosystem', 
          label: '8-Pillars CMS', 
          icon: Layers, 
          badge: '8 Active',
          badgeType: 'default',
          roleReq: ['CREATIVE_EDITOR', 'SUPER_ADMIN'] 
        },
        { 
          id: 'discovery', 
          label: 'Discovery Suite', 
          icon: Globe, 
          badge: 'SEO/AEO',
          badgeType: 'default',
          roleReq: ['CREATIVE_EDITOR', 'SUPER_ADMIN'] 
        }
      ]
    },
    {
      groupTitle: 'SYSTEM & GOVERNANCE',
      items: [
        { 
          id: 'automation', 
          label: 'Automation & Logs', 
          icon: Activity, 
          badge: 'Live',
          badgeType: 'success',
          roleReq: ['TECH_ENGINEER', 'SUPER_ADMIN'] 
        },
        { 
          id: 'governance', 
          label: 'System Governance', 
          icon: ShieldCheck, 
          badge: 'RBAC',
          badgeType: 'default',
          roleReq: ['SUPER_ADMIN'] 
        }
      ]
    }
  ];

  function handleNavClick(tabId) {
    setActiveTab(tabId);
    if (setMobileOpen) setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        className={`admin-sidebar-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen && setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Lockup & Mobile Close Button */}
        <div className="sidebar-brand-header">
          <div className="sidebar-brand-left">
            <img 
              src="/logo.png" 
              alt="NEXA GROWTH" 
              className="sidebar-logo-img" 
            />
            <span className="sidebar-badge">OPS SUITE</span>
          </div>

          <button 
            className="sidebar-mobile-close-btn" 
            onClick={() => setMobileOpen && setMobileOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categorized Navigation Groups */}
        <nav className="sidebar-nav">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="sidebar-nav-group">
              <div className="sidebar-group-label">{group.groupTitle}</div>
              <div className="sidebar-group-items">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <div className="sidebar-nav-item-left">
                        <Icon size={16} className="sidebar-nav-icon" />
                        <span className="sidebar-nav-label">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`sidebar-nav-badge badge-${item.badgeType || 'default'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Operator Profile & Return */}
        <div className="sidebar-footer">
          <div className="operator-profile-card">
            <div className="operator-avatar">
              {user?.name ? user.name[0].toUpperCase() : 'S'}
            </div>
            <div className="operator-info">
              <div className="operator-name">{user?.name || 'Sakxam Bhattarai'}</div>
              <div className="operator-role">{user?.role || 'SUPER_ADMIN'}</div>
            </div>
          </div>

          <button 
            onClick={logout} 
            className="btn-admin btn-admin-secondary sidebar-logout-btn" 
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>

          <a href="/" className="sidebar-return-link">
            <span>Return to Public Site</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </aside>
    </>
  );
}
