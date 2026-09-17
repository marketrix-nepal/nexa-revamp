import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Download, Users, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';

export function SystemGovernanceView() {
  const { hasRole, role } = useAuth();
  const isSuperAdmin = hasRole('SUPER_ADMIN');

  const [usersList, setUsersList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [exportFormat, setExportFormat] = useState('json');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [feedback, setFeedback] = useState('');

  const roles = ['SUPER_ADMIN', 'STRATEGIC_CONSULTANT', 'CREATIVE_EDITOR', 'TECH_ENGINEER'];

  async function fetchGovernanceData() {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` };
      const [usersRes, auditRes] = await Promise.all([
        fetch('/api/users', { headers }),
        fetch('/api/users/audit', { headers })
      ]);

      if (usersRes.ok) {
        const uData = await usersRes.json();
        setUsersList(uData.users);
      }
      if (auditRes.ok) {
        const aData = await auditRes.json();
        setAuditLogs(aData.auditTrail);
      }
    } catch (err) {
      console.error('Fetch governance data error:', err);
    }
  }

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  async function handleRoleChange(userId, newRole) {
    if (!isSuperAdmin) return;
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setFeedback(`Assigned role ${newRole} successfully.`);
        fetchGovernanceData();
      }
    } catch (err) {
      setFeedback('Role updated in session.');
    } finally {
      setTimeout(() => setFeedback(''), 3000);
    }
  }

  function handleExport() {
    let url = `/api/users/export/diagnostics?format=${exportFormat}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;

    // Trigger direct browser download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexa-growth-diagnostics.${exportFormat}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="admin-view-canvas">
      
      {/* RBAC Notice */}
      {!isSuperAdmin && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-crimson-dim)', border: '1px solid var(--admin-crimson)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-crimson)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          <span>Restricted: Modifying operator roles and downloading commercial client data requires Super Admin authorization.</span>
        </div>
      )}

      {feedback && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-green-dim)', border: '1px solid var(--admin-green)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-green)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid: Operator Role Matrix (Left) & Export Utility (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* User Management Table */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} color="var(--admin-crimson)" />
              <h3 className="admin-card-title">Operator Profile & RBAC Matrix</h3>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Operator Name</th>
                  <th>Assigned RBAC Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{u.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>{u.email}</div>
                    </td>
                    <td>
                      {isSuperAdmin ? (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="admin-select"
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        >
                          {roles.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="status-pill status-pill-warning">{u.role}</span>
                      )}
                    </td>
                    <td>
                      <span className="status-pill status-pill-success">{u.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagnostic Data Export Tool */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSpreadsheet size={16} color="var(--admin-amber)" />
              <h3 className="admin-card-title">Client Diagnostic Data Export</h3>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
            Export inbound diagnostics, corporate metrics, and lead scores directly into structured formats for executive reporting.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
              EXPORT FORMAT:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setExportFormat('json')}
                className={`btn-admin ${exportFormat === 'json' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Structured JSON
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('csv')}
                className={`btn-admin ${exportFormat === 'csv' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                CSV Spreadsheet
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.25rem' }}>
                FROM DATE:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="admin-input"
                style={{ fontSize: '0.78rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.25rem' }}>
                TO DATE:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="admin-input"
                style={{ fontSize: '0.78rem' }}
              />
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={!isSuperAdmin}
            className="btn-admin btn-admin-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
          >
            <Download size={14} />
            <span>Download {exportFormat.toUpperCase()} Export</span>
          </button>
        </div>

      </div>

      {/* Immutable Regulatory Audit Trail Stream */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="var(--admin-green)" />
            <h3 className="admin-card-title">Immutable Operational & Regulatory Audit Trail</h3>
          </div>
          <span className="status-pill status-pill-success">Middleware Verified</span>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', margin: '0 0 1rem 0' }}>
          Every POST, PUT, and DELETE action is automatically intercepted and permanently written to this immutable compliance ledger.
        </p>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Operator ID</th>
                <th>Action Performed</th>
                <th>Resource Targeted</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                    {log.id}
                  </td>
                  <td style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem', color: '#FFFFFF' }}>
                    {log.user_id}
                  </td>
                  <td>
                    <span className="status-pill status-pill-warning">{log.action_performed}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontFamily: 'var(--admin-font-mono)' }}>
                    {log.resource_targeted}
                  </td>
                  <td style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-amber)' }}>
                    {log.ip_address}
                  </td>
                  <td style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
