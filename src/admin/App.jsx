import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginView } from './views/LoginView';
import { CrmConsoleView } from './views/CrmConsoleView';
import { WebsiteCmsView } from './views/WebsiteCmsView';
import { EcosystemManagerView } from './views/EcosystemManagerView';
import { DiscoverySuiteView } from './views/DiscoverySuiteView';
import { AutomationTerminalView } from './views/AutomationTerminalView';
import { SystemGovernanceView } from './views/SystemGovernanceView';
import './styles/admin.css';

function AdminShell() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('crm');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--admin-bg-void)', color: 'var(--admin-text-muted)', fontFamily: 'var(--admin-font-mono)', fontSize: '0.85rem' }}>
        <span>INITIALIZING SECURE SESSION...</span>
      </div>
    );
  }

  // Gateway barrier: public access is blocked except for authenticated operators
  if (!user) {
    return <LoginView />;
  }

  return (
    <div className="admin-app-shell">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={sidebarMobileOpen} 
        setMobileOpen={setSidebarMobileOpen} 
      />
      <main className="admin-main-stage">
        <Header 
          activeTab={activeTab} 
          onToggleSidebar={() => setSidebarMobileOpen(prev => !prev)} 
        />
        {activeTab === 'crm' && <CrmConsoleView />}
        {activeTab === 'cms' && <WebsiteCmsView />}
        {activeTab === 'ecosystem' && <EcosystemManagerView />}
        {activeTab === 'discovery' && <DiscoverySuiteView />}
        {activeTab === 'automation' && <AutomationTerminalView />}
        {activeTab === 'governance' && <SystemGovernanceView />}
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AdminShell />
    </AuthProvider>
  );
}
