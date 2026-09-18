import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Clock, Menu } from 'lucide-react';

export function Header({ activeTab, onToggleSidebar }) {
  const { role, switchRole } = useAuth();
  const [times, setTimes] = useState({ auckland: '', singapore: '' });

  const titles = {
    crm: 'CRM & Diagnostic Pipeline',
    ecosystem: '8 Core Service Pillars CMS',
    discovery: 'Discovery Suite (SEO / AEO / GEO)',
    automation: 'Automation & Dispatch Terminal',
    governance: 'Governance & RBAC Console'
  };

  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      const akl = now.toLocaleTimeString('en-GB', { timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const sg = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTimes({ auckland: `${akl} NZST`, singapore: `${sg} SGT` });
    }
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="admin-top-header">
      <div className="header-left-zone">
        {/* Mobile Hamburger Trigger */}
        <button 
          className="admin-mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Open Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="header-title-zone">
          <h1 className="header-view-title">{titles[activeTab] || 'Operations'}</h1>
          <span className="status-pill status-pill-success" title="Audit middleware actively logging mutations">
            <Shield size={11} />
            <span>Audit Active</span>
          </span>
        </div>
      </div>

      <div className="header-telemetry-zone">
        <div className="telemetry-clock-tag clock-auckland">
          <Clock size={11} />
          <span>AKL: {times.auckland || '--:--:--'}</span>
        </div>
        <div className="telemetry-clock-tag clock-singapore">
          <Clock size={11} />
          <span>SG: {times.singapore || '--:--:--'}</span>
        </div>

        {/* Live RBAC Role Switcher */}
        <div className="header-role-wrapper">
          <span className="role-label">ROLE:</span>
          <select 
            value={role || 'SUPER_ADMIN'} 
            onChange={(e) => switchRole(e.target.value)}
            className="role-switcher-dropdown"
            title="Switch operator role to test RBAC restrictions"
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="STRATEGIC_CONSULTANT">STRATEGIC_CONSULTANT</option>
            <option value="CREATIVE_EDITOR">CREATIVE_EDITOR</option>
            <option value="TECH_ENGINEER">TECH_ENGINEER</option>
          </select>
        </div>
      </div>
    </header>
  );
}
