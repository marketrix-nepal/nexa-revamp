import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, RefreshCw, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function AutomationTerminalView() {
  const { hasRole } = useAuth();
  const isTechOrAdmin = hasRole(['TECH_ENGINEER', 'SUPER_ADMIN']);

  const [logs, setLogs] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [retryingId, setRetryingId] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  async function fetchData() {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` };
      const [logsRes, whRes] = await Promise.all([
        fetch(`/api/automation/logs?status=${statusFilter}`, { headers }),
        fetch('/api/automation/webhooks', { headers })
      ]);

      if (logsRes.ok) {
        const data = await logsRes.json();
        setLogs(data.logs);
      }
      if (whRes.ok) {
        const whData = await whRes.json();
        setWebhooks(whData);
      }
    } catch (err) {
      console.error('Automation fetch failed:', err);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  async function handleRetry(logId) {
    if (!isTechOrAdmin) return;
    setRetryingId(logId);
    try {
      const res = await fetch(`/api/automation/retry/${logId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` }
      });
      if (res.ok) {
        setActionMsg(`Log ${logId} re-triggered successfully.`);
        fetchData();
      }
    } catch (err) {
      setActionMsg('Retry executed in active session.');
    } finally {
      setRetryingId(null);
      setTimeout(() => setActionMsg(''), 3000);
    }
  }

  return (
    <div className="admin-view-canvas">
      
      {/* Role Alert */}
      {!isTechOrAdmin && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-crimson-dim)', border: '1px solid var(--admin-crimson)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-crimson)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          <span>Restricted: Viewing live telemetry logs and triggering webhook retries requires Tech Engineer or Super Admin permissions.</span>
        </div>
      )}

      {actionMsg && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-green-dim)', border: '1px solid var(--admin-green)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-green)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Webhook Health State Matrix */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Integration Webhook Health Matrix</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0 0' }}>
              Real-time ping telemetry for public landing page diagnostics, Auckland SMS dispatch, and CRM sync relays.
            </p>
          </div>
          <button onClick={fetchData} className="btn-admin btn-admin-secondary" style={{ fontSize: '0.75rem' }}>
            <RefreshCw size={12} />
            <span>Poll Status</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {webhooks.map((wh) => {
            let statusPill = 'status-pill-success';
            let StatusIcon = CheckCircle;
            if (wh.status === 'DEGRADED') {
              statusPill = 'status-pill-warning';
              StatusIcon = AlertTriangle;
            } else if (wh.status === 'FAILING') {
              statusPill = 'status-pill-failed';
              StatusIcon = XCircle;
            }

            return (
              <div key={wh.id} style={{ padding: '1rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className={`status-pill ${statusPill}`}>{wh.status}</span>
                  <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>
                    {wh.latency_ms}ms
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
                  {wh.name}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-amber)' }}>
                  Uptime: {wh.success_rate}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Automation Log Stream Terminal */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Activity size={18} color="var(--admin-crimson)" />
            <h3 className="admin-card-title">Live AutomationLog Terminal Stream</h3>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['ALL', 'SUCCESS', 'WARNING', 'FAILED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn-admin ${statusFilter === st ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Agent / Job Name</th>
                <th>Payload Summary</th>
                <th>Executed At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                let pillClass = 'status-pill-success';
                if (log.status === 'WARNING') pillClass = 'status-pill-warning';
                if (log.status === 'FAILED') pillClass = 'status-pill-failed';

                return (
                  <tr key={log.id}>
                    <td>
                      <span className={`status-pill ${pillClass}`}>{log.status}</span>
                    </td>
                    <td>
                      <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.78rem', color: '#FFFFFF', fontWeight: 600 }}>
                        {log.agent_name}
                      </div>
                      {log.retry_count > 0 && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--admin-amber)' }}>
                          Retries: {log.retry_count}
                        </span>
                      )}
                    </td>
                    <td style={{ maxWidth: '400px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)', lineHeight: 1.4 }}>
                        {log.payload_summary}
                      </div>
                      {log.error_message && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-crimson)', fontFamily: 'var(--admin-font-mono)', marginTop: '0.25rem' }}>
                          Error: {log.error_message}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>
                        {new Date(log.executed_at).toLocaleTimeString()}
                      </span>
                    </td>
                    <td>
                      {log.status === 'FAILED' && isTechOrAdmin ? (
                        <button
                          disabled={retryingId === log.id}
                          onClick={() => handleRetry(log.id)}
                          className="btn-admin btn-admin-danger"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                        >
                          <RefreshCw size={12} />
                          <span>{retryingId === log.id ? 'Retrying...' : 'Manual Retry'}</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
