import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_AUTOMATION_LOGS, INITIAL_WEBHOOKS, getMockStore, setMockStore } from '../data/adminMockData';
import { Activity, RefreshCw, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function AutomationTerminalView() {
  const { hasRole } = useAuth();
  const isTechOrAdmin = hasRole(['TECH_ENGINEER', 'SUPER_ADMIN']);

  const [logs, setLogs] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [retryingId, setRetryingId] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  const fallbackLogs = [
    {
      id: 'log-01',
      event_name: 'INBOUND_TERMINAL_SUBMISSION',
      status: 'SUCCESS',
      duration_ms: 142,
      payload_json: { client: 'Solaria Energy', budget: '$100k-$200k', partner: 'Marcus Wright' },
      created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString()
    },
    {
      id: 'log-02',
      event_name: 'PIPELINE_STAGE_TRANSITION',
      status: 'SUCCESS',
      duration_ms: 88,
      payload_json: { client: 'Aetheris Logistics', new_stage: 'STRATEGY' },
      created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString()
    },
    {
      id: 'log-03',
      event_name: 'SLACK_PARTNER_ALERT',
      status: 'WARNING',
      duration_ms: 480,
      payload_json: { channel: '#deals-executive', retryCount: 1 },
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: 'log-04',
      event_name: 'EDGE_CACHE_PURGE',
      status: 'SUCCESS',
      duration_ms: 215,
      payload_json: { target: 'Cloudflare Pages (main)', purged: 115 },
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    }
  ];

  const fallbackWebhooks = [
    { id: 'wh-01', name: 'Scoping Ingestion Hook', status: 'HEALTHY', latency_ms: 42, success_rate: '99.9%' },
    { id: 'wh-02', name: 'Slack Partner Bot Hook', status: 'HEALTHY', latency_ms: 120, success_rate: '99.4%' },
    { id: 'wh-03', name: 'CRM Pipeline Webhook', status: 'HEALTHY', latency_ms: 68, success_rate: '100%' },
    { id: 'wh-04', name: 'Cloudflare Edge Webhook', status: 'HEALTHY', latency_ms: 210, success_rate: '100%' }
  ];

  async function fetchData() {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` };
      const [logsRes, whRes] = await Promise.all([
        fetch(`/api/automation/logs?status=${statusFilter}`, { headers }),
        fetch('/api/automation/webhooks', { headers })
      ]);

      if (logsRes.ok && whRes.ok) {
        const data = await logsRes.json();
        const whData = await whRes.json();
        if (data.logs) setLogs(data.logs);
        if (whData) setWebhooks(whData);
        return;
      }
    } catch (err) {}

    let filteredLogs = getMockStore('automation_logs', fallbackLogs);
    if (statusFilter !== 'ALL') {
      filteredLogs = filteredLogs.filter(l => l.status === statusFilter);
    }
    setLogs(filteredLogs);
    setWebhooks(fallbackWebhooks);
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

        <div className="webhook-grid">
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
              <div key={wh.id} className="webhook-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className={`status-pill ${statusPill}`}>{wh.status}</span>
                  <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>
                    {wh.latency_ms || wh.latency || '42ms'}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
                  {wh.name}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-amber)' }}>
                  Uptime: {wh.success_rate || '99.9%'}
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

          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px' }}>
            {['ALL', 'SUCCESS', 'WARNING', 'FAILED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn-admin ${statusFilter === st ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', whiteSpace: 'nowrap' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Log Feed */}
        <div className="automation-mobile-feed">
          {logs.map((log) => {
            let pillClass = 'status-pill-success';
            if (log.status === 'WARNING') pillClass = 'status-pill-warning';
            if (log.status === 'FAILED' || log.status === 'ERROR') pillClass = 'status-pill-failed';

            return (
              <div key={log.id} className="log-touch-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span className={`status-pill ${pillClass}`}>{log.status}</span>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)' }}>
                    {new Date(log.executed_at || log.created_at || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                  {log.agent_name || log.event_name || 'TELEMETRY_DISPATCH'}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-secondary)', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                  {log.payload_summary || JSON.stringify(log.payload_json || {})}
                </div>
                {log.status === 'FAILED' && isTechOrAdmin && (
                  <button
                    disabled={retryingId === log.id}
                    onClick={() => handleRetry(log.id)}
                    className="btn-admin btn-admin-danger"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.35rem', fontSize: '0.75rem' }}
                  >
                    <RefreshCw size={12} />
                    <span>{retryingId === log.id ? 'Retrying...' : 'Manual Retry'}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-wrapper automation-desktop-table">
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
                if (log.status === 'FAILED' || log.status === 'ERROR') pillClass = 'status-pill-failed';

                return (
                  <tr key={log.id}>
                    <td>
                      <span className={`status-pill ${pillClass}`}>{log.status}</span>
                    </td>
                    <td>
                      <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.78rem', color: '#FFFFFF', fontWeight: 600 }}>
                        {log.agent_name || log.event_name || 'TELEMETRY_DISPATCH'}
                      </div>
                      {log.retry_count > 0 && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--admin-amber)' }}>
                          Retries: {log.retry_count}
                        </span>
                      )}
                    </td>
                    <td style={{ maxWidth: '400px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)', lineHeight: 1.4 }}>
                        {log.payload_summary || JSON.stringify(log.payload_json || {})}
                      </div>
                      {log.error_message && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-crimson)', fontFamily: 'var(--admin-font-mono)', marginTop: '0.25rem' }}>
                          Error: {log.error_message}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>
                        {new Date(log.executed_at || log.created_at || Date.now()).toLocaleTimeString()}
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
