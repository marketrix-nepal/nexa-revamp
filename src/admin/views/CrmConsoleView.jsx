import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ClientModal } from '../components/ClientModal';
import { INITIAL_DIAGNOSTICS, getMockStore, setMockStore } from '../data/adminMockData';
import { 
  Kanban, 
  Table as TableIcon, 
  Search, 
  ArrowUpDown, 
  ChevronRight, 
  Building2, 
  Calendar 
} from 'lucide-react';

export function CrmConsoleView() {
  const { hasRole } = useAuth();
  const isConsultantOrAdmin = hasRole(['STRATEGIC_CONSULTANT', 'SUPER_ADMIN']);

  const [diagnostics, setDiagnostics] = useState([]);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'table'
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const stages = ['DIAGNOSE', 'STRATEGY', 'DESIGN', 'TECH', 'MARKETING', 'MEASUREMENT'];

  async function fetchDiagnostics() {
    let list = [];
    try {
      const res = await fetch(`/api/crm/diagnostics?stage=${stageFilter}&search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        list = data.diagnostics || [];
      } else {
        throw new Error('API offline');
      }
    } catch {
      const stored = getMockStore('diagnostics', INITIAL_DIAGNOSTICS);
      list = stored;
      if (stageFilter !== 'ALL') {
        list = list.filter(d => d.pipeline_stage === stageFilter);
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        list = list.filter(d => 
          (d.company_name && d.company_name.toLowerCase().includes(q)) ||
          (d.contact_email && d.contact_email.toLowerCase().includes(q)) ||
          (d.friction_summary && d.friction_summary.toLowerCase().includes(q))
        );
      }
    }
    setDiagnostics(list);
    setLoading(false);
  }

  useEffect(() => {
    fetchDiagnostics();
  }, [stageFilter, search]);

  async function advanceStage(client, e) {
    if (e) e.stopPropagation();
    if (!isConsultantOrAdmin) {
      alert('Stage advancement is restricted to Strategic Consultants and Super Admins.');
      return;
    }

    const currentIndex = stages.indexOf(client.pipeline_stage);
    if (currentIndex === -1 || currentIndex === stages.length - 1) return;

    const nextStage = stages[currentIndex + 1];
    try {
      const res = await fetch(`/api/crm/diagnostics/${client.id}/stage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({ new_stage: nextStage })
      });
      if (res.ok) {
        fetchDiagnostics();
        return;
      }
    } catch (err) {
      // Continue to local mock sync
    }

    const stored = getMockStore('diagnostics', INITIAL_DIAGNOSTICS);
    const updated = stored.map(item => item.id === client.id ? { ...item, pipeline_stage: nextStage } : item);
    setMockStore('diagnostics', updated);
    fetchDiagnostics();
  }

  // Pipeline metrics
  const totalPipeline = diagnostics.reduce((acc, curr) => {
    const raw = curr.operational_data_json?.budget_range || curr.budget_range || '$100,000';
    const num = parseInt(raw.replace(/[^0-9]/g, ''), 10) || 50000;
    return acc + num;
  }, 0);

  return (
    <div className="admin-view-canvas">
      
      {/* 1. Executive Telemetry Summary Strip */}
      <div className="crm-kpi-grid">
        <div className="crm-kpi-card">
          <div className="crm-kpi-label">PIPELINE VALUE</div>
          <div className="crm-kpi-val">${(totalPipeline / 1000).toFixed(0)}k+</div>
          <div className="crm-kpi-sub">Weighted qualified enterprise volume</div>
        </div>
        <div className="crm-kpi-card">
          <div className="crm-kpi-label">ACTIVE CLIENTS</div>
          <div className="crm-kpi-val">{diagnostics.length}</div>
          <div className="crm-kpi-sub">Inbound diagnostics in flight</div>
        </div>
        <div className="crm-kpi-card">
          <div className="crm-kpi-label">AVG LEAD SCORE</div>
          <div className="crm-kpi-val">93<span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>/100</span></div>
          <div className="crm-kpi-sub">High strategic alignment index</div>
        </div>
        <div className="crm-kpi-card">
          <div className="crm-kpi-label">RUNTIME SYNC</div>
          <div className="crm-kpi-val" style={{ color: 'var(--admin-green)' }}>100%</div>
          <div className="crm-kpi-sub">Auckland HQ & Singapore edge</div>
        </div>
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="admin-card crm-controls-card">
        <div className="crm-controls-row">
          
          {/* Search Box */}
          <div className="crm-search-box">
            <Search size={14} className="crm-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by company, email, or friction..."
              className="admin-input crm-search-input"
            />
          </div>

          {/* Desktop View Switcher */}
          <div className="crm-view-switch-group">
            <button
              onClick={() => setViewMode('kanban')}
              className={`btn-admin ${viewMode === 'kanban' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
              style={{ padding: '0.4rem 0.75rem' }}
              title="Kanban Board View"
            >
              <Kanban size={14} />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`btn-admin ${viewMode === 'table' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
              style={{ padding: '0.4rem 0.75rem' }}
              title="Dense Data Table View"
            >
              <TableIcon size={14} />
              <span>Table</span>
            </button>
          </div>

        </div>

        {/* 3. Segmented Horizontal Stage Filter Chips (App-Style) */}
        <div className="crm-stage-chips-bar">
          <button
            onClick={() => setStageFilter('ALL')}
            className={`stage-chip ${stageFilter === 'ALL' ? 'active' : ''}`}
          >
            All Stages ({diagnostics.length})
          </button>
          {stages.map(st => {
            const count = diagnostics.filter(d => d.pipeline_stage === st).length;
            return (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`stage-chip ${stageFilter === st ? 'active' : ''}`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile Card Feed (Active on <= 768px screens to eliminate horizontal scrolling) */}
      <div className="crm-mobile-card-feed">
        {diagnostics.map((lead) => {
          const currentIndex = stages.indexOf(lead.pipeline_stage);
          const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;

          return (
            <div 
              key={lead.id} 
              className="crm-touch-card"
              onClick={() => setSelectedClient(lead)}
            >
              <div className="crm-touch-card-header">
                <div>
                  <h4 className="crm-touch-company">{lead.company_name}</h4>
                  <div className="crm-touch-email">{lead.contact_email}</div>
                </div>
                <span className={`status-pill status-pill-${lead.pipeline_stage === 'MEASUREMENT' ? 'success' : 'warning'}`}>
                  {lead.pipeline_stage}
                </span>
              </div>

              <div className="crm-touch-card-meta">
                <div className="crm-meta-item">
                  <span className="crm-meta-k">SECTOR</span>
                  <span className="crm-meta-v">{lead.operational_data_json?.client_type || 'Enterprise'}</span>
                </div>
                <div className="crm-meta-item">
                  <span className="crm-meta-k">BUDGET</span>
                  <span className="crm-meta-v" style={{ color: 'var(--admin-amber)' }}>
                    {lead.operational_data_json?.budget_range || lead.budget_range || '$50k+'}
                  </span>
                </div>
                <div className="crm-meta-item">
                  <span className="crm-meta-k">SCORE</span>
                  <span className="crm-meta-v">{lead.lead_score || 90}/100</span>
                </div>
              </div>

              <p className="crm-touch-friction">
                {lead.friction_summary || lead.selected_bottleneck || 'Inbound diagnostic awaiting partner alignment.'}
              </p>

              <div className="crm-touch-actions" onClick={(e) => e.stopPropagation()}>
                {nextStage && isConsultantOrAdmin ? (
                  <button
                    onClick={(e) => advanceStage(lead, e)}
                    className="btn-admin btn-admin-primary crm-touch-action-btn"
                  >
                    <span>Advance to {nextStage}</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <span className="status-pill status-pill-success" style={{ alignSelf: 'center' }}>
                    Finalized Stage
                  </span>
                )}
                
                <button
                  onClick={() => setSelectedClient(lead)}
                  className="btn-admin btn-admin-secondary"
                  style={{ padding: '0.45rem 0.85rem' }}
                >
                  Dossier →
                </button>
              </div>
            </div>
          );
        })}

        {diagnostics.length === 0 && (
          <div className="admin-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
              No client dossiers match the selected filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* 5. Desktop Mode: Kanban Board (Visible on > 768px) */}
      <div className="crm-desktop-view-container">
        {viewMode === 'kanban' ? (
          <div className="kanban-board-container">
            {stages.map((st) => {
              const columnLeads = diagnostics.filter(d => d.pipeline_stage === st);
              return (
                <div key={st} className="kanban-column">
                  <div className="kanban-column-header">
                    <span className="kanban-col-title">{st}</span>
                    <span className="kanban-col-count">{columnLeads.length}</span>
                  </div>

                  <div className="kanban-cards-track">
                    {columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="kanban-lead-card"
                        onClick={() => setSelectedClient(lead)}
                      >
                        <div className="kanban-card-top">
                          <span className="status-pill status-pill-warning">
                            SCORE: {lead.lead_score || 90}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontFamily: 'var(--admin-font-mono)' }}>
                            {lead.operational_data_json?.client_type || 'SME'}
                          </span>
                        </div>

                        <h4 className="kanban-company-title">{lead.company_name}</h4>
                        <p className="kanban-card-bottleneck">{lead.selected_bottleneck || lead.friction_summary}</p>

                        <div className="kanban-card-controls">
                          <span style={{ fontSize: '0.72rem', color: 'var(--admin-amber)', fontFamily: 'var(--admin-font-mono)' }}>
                            {lead.operational_data_json?.budget_range || lead.budget_range || '$50k+'}
                          </span>

                          {st !== 'MEASUREMENT' && isConsultantOrAdmin && (
                            <button
                              onClick={(e) => advanceStage(lead, e)}
                              className="btn-admin btn-admin-secondary"
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                              title="Advance to next stage"
                            >
                              <span>Advance</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {columnLeads.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--admin-text-muted)', fontSize: '0.78rem' }}>
                        No active leads in {st}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Mode 2: High-Density Lead Triage Data Table */
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lead Score</th>
                  <th>Company Name</th>
                  <th>Client Type</th>
                  <th>Primary Pillar</th>
                  <th>Stage</th>
                  <th>Budget Tier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {diagnostics.map((lead) => (
                  <tr key={lead.id} onClick={() => setSelectedClient(lead)} style={{ cursor: 'pointer' }}>
                    <td>
                      <span className="status-pill status-pill-warning">
                        {lead.lead_score || 90} / 100
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{lead.company_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{lead.contact_email}</div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem' }}>
                        {lead.operational_data_json?.client_type || 'Enterprise'}
                      </span>
                    </td>
                    <td>{lead.operational_data_json?.primary_pillar || 'Strategy & Growth'}</td>
                    <td>
                      <span className="status-pill status-pill-success">
                        {lead.pipeline_stage}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--admin-amber)', fontFamily: 'var(--admin-font-mono)' }}>
                        {lead.operational_data_json?.budget_range || lead.budget_range || '$50k+'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClient(lead);
                        }}
                        className="btn-admin btn-admin-secondary"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        Dossier →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdate={fetchDiagnostics}
        />
      )}

    </div>
  );
}
