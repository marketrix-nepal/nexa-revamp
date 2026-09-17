import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Clock } from 'lucide-react';

export function Header({ activeTab }) {
  const { role, switchRole } = useAuth();
  const [times, setTimes] = useState({ auckland: '', singapore: '' });

  const titles = {
    crm: 'Ingestion & Lead Triage (CRM Console)',
    ecosystem: 'Structural Ecosystem Manager (CMS Console)',
    discovery: 'Modern Discovery Suite (SEO / AEO / GEO)',
    automation: 'Automation Orchestrator & Logging Terminal',
    governance: 'Management & System Configuration'
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
      <div className="header-title-zone">
        <h1 className="header-view-title">{titles[activeTab] || 'Operations'}</h1>
        <span className="status-pill status-pill-success" title="Audit middleware actively logging mutations">
          <Shield size={12} />
          <span>Audit Logged</span>
        </span>
      </div>

      <div className="header-telemetry-zone">
        <div className="telemetry-clock-tag">
          <Clock size={12} />
          <span>Auckland: {times.auckland || '--:--:--'}</span>
        </div>
        <div className="telemetry-clock-tag">
          <Clock size={12} />
          <span>Singapore: {times.singapore || '--:--:--'}</span>
        </div>

        {/* Live RBAC Role Switcher (Facilitates instant role permission testing) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', fontFamily: 'var(--admin-font-mono)' }}>ROLE:</span>
          <select 
            value={role || 'SUPER_ADMIN'} 
            onChange={(e) => switchRole(e.target.value)}
            className="role-switcher-dropdown"
            title="Switch operator role to test RBAC restrictions"
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN (All Access)</option>
            <option value="STRATEGIC_CONSULTANT">STRATEGIC_CONSULTANT (CRM Only)</option>
            <option value="CREATIVE_EDITOR">CREATIVE_EDITOR (CMS & Discovery)</option>
            <option value="TECH_ENGINEER">TECH_ENGINEER (Logs & Webhooks)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
