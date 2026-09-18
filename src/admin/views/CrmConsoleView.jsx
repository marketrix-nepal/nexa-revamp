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

  return (
    <div className="admin-view-canvas">
      
      {/* Top Filter & View Toggle Bar */}
      <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by company, email or bottleneck..."
              className="admin-input"
              style={{ paddingLeft: '32px' }}
            />
          </div>

          {/* Controls: Stage Filter & View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="admin-select"
              style={{ width: 'auto', fontSize: '0.82rem' }}
            >
              <option value="ALL">All Operational Stages</option>
              {stages.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <div style={{ display: 'flex', background: 'var(--admin-bg-surface)', padding: '2px', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-border-subtle)' }}>
              <button
                onClick={() => setViewMode('kanban')}
                className={`btn-admin ${viewMode === 'kanban' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ padding: '0.35rem 0.65rem' }}
                title="Kanban Board View"
              >
                <Kanban size={14} />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`btn-admin ${viewMode === 'table' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ padding: '0.35rem 0.65rem' }}
                title="Dense Data Table View"
              >
                <TableIcon size={14} />
                <span>Table</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* View Mode 1: 6-Step Operational Kanban Board */}
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
                          SCORE: {lead.lead_score}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontFamily: 'var(--admin-font-mono)' }}>
                          {lead.operational_data_json?.client_type || 'SME'}
                        </span>
                      </div>

                      <h4 className="kanban-company-title">{lead.company_name}</h4>
                      <p className="kanban-card-bottleneck">{lead.selected_bottleneck}</p>

                      <div className="kanban-card-controls">
                        <span style={{ fontSize: '0.72rem', color: 'var(--admin-amber)', fontFamily: 'var(--admin-font-mono)' }}>
                          {lead.operational_data_json?.budget_range || '$15k+'}
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
        /* View Mode 2: High-Density Lead Triage Data Table */
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
                      {lead.lead_score} / 100
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{lead.company_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{lead.contact_email}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem' }}>
                      {lead.operational_data_json?.client_type || 'SME'}
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
                      {lead.operational_data_json?.budget_range || '$15k+'}
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
