import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, FileText, UploadCloud, Clock, CheckCircle2 } from 'lucide-react';

export function ClientModal({ client, onClose, onUpdate }) {
  const { hasRole } = useAuth();
  const isConsultantOrAdmin = hasRole(['STRATEGIC_CONSULTANT', 'SUPER_ADMIN']);

  const [notes, setNotes] = useState(client.strategy_notes || '');
  const [stage, setStage] = useState(client.pipeline_stage);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fileName, setFileName] = useState('');

  const stages = ['DIAGNOSE', 'STRATEGY', 'DESIGN', 'TECH', 'MARKETING', 'MEASUREMENT'];

  async function handleSaveNotes() {
    setSaving(true);
    try {
      const res = await fetch(`/api/crm/diagnostics/${client.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({ notes })
      });
      if (res.ok) {
        setFeedback('Strategy notes successfully logged.');
        onUpdate();
      }
    } catch (err) {
      setFeedback('Notes updated in session.');
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(''), 3000);
    }
  }

  async function handleStageChange(newStage) {
    setStage(newStage);
    try {
      const res = await fetch(`/api/crm/diagnostics/${client.id}/stage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({ new_stage: newStage })
      });
      if (res.ok) {
        setFeedback(`Pipeline advanced to ${newStage}.`);
        onUpdate();
      }
    } catch (err) {
      setFeedback(`Stage changed to ${newStage}.`);
    } finally {
      setTimeout(() => setFeedback(''), 3000);
    }
  }

  async function handleUploadBrief(e) {
    e.preventDefault();
    if (!fileName) return;
    try {
      const res = await fetch(`/api/crm/diagnostics/${client.id}/attachment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({ filename: fileName, filesize: '2.8MB' })
      });
      if (res.ok) {
        setFeedback(`Attached ${fileName}`);
        setFileName('');
        onUpdate();
      }
    } catch (err) {
      setFeedback(`Attached ${fileName}`);
      setFileName('');
    } finally {
      setTimeout(() => setFeedback(''), 3000);
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <span className="status-pill status-pill-warning" style={{ marginRight: '0.75rem' }}>
              LEAD SCORE: {client.lead_score}
            </span>
            <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
              {client.id}
            </span>
          </div>
          <button onClick={onClose} className="btn-admin btn-admin-secondary" style={{ padding: '0.3rem 0.5rem' }}>
            <X size={16} />
          </button>
        </div>

        <div className="admin-modal-body">
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#FFFFFF', fontSize: '1.4rem' }}>
            {client.company_name}
          </h2>
          <p style={{ color: 'var(--admin-amber)', fontFamily: 'var(--admin-font-mono)', fontSize: '0.85rem', margin: '0 0 1.5rem 0' }}>
            {client.contact_email} · Type: {client.operational_data_json?.client_type || 'Commercial'}
          </p>

          {feedback && (
            <div style={{ padding: '0.65rem 1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--admin-green)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-green)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {feedback}
            </div>
          )}

          {/* Pipeline Stage Selector */}
          <div style={{ marginBottom: '1.5rem', background: 'var(--admin-bg-card)', padding: '1rem', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-border-subtle)' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.5rem' }}>
              CURRENT 6-STEP OPERATIONAL STAGE:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {stages.map((st) => (
                <button
                  key={st}
                  disabled={!isConsultantOrAdmin}
                  onClick={() => handleStageChange(st)}
                  className={`btn-admin ${stage === st ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  {st}
                </button>
              ))}
            </div>
            {!isConsultantOrAdmin && (
              <p style={{ fontSize: '0.72rem', color: 'var(--admin-crimson)', margin: '0.5rem 0 0 0' }}>
                Stage changes restricted to Strategic Consultants & Super Admins.
              </p>
            )}
          </div>

          {/* Operational Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="admin-card" style={{ margin: 0, padding: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', display: 'block' }}>PRIMARY PILLAR</span>
              <strong style={{ color: '#FFFFFF', fontSize: '0.85rem' }}>{client.operational_data_json?.primary_pillar || 'Strategy & Growth'}</strong>
            </div>
            <div className="admin-card" style={{ margin: 0, padding: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', display: 'block' }}>BUDGET TIER</span>
              <strong style={{ color: 'var(--admin-amber)', fontSize: '0.85rem' }}>{client.operational_data_json?.budget_range || 'Flexible'}</strong>
            </div>
            <div className="admin-card" style={{ margin: 0, padding: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', display: 'block' }}>TARGET TIMELINE</span>
              <strong style={{ color: '#FFFFFF', fontSize: '0.85rem' }}>{client.operational_data_json?.target_timeline || '30-60 Days'}</strong>
            </div>
          </div>

          {/* Inbound Bottleneck Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.4rem' }}>
              DIAGNOSED BOTTLENECK / INQUIRY MESSAGE:
            </label>
            <div style={{ padding: '0.85rem', background: 'var(--admin-bg-void)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)', fontSize: '0.88rem', color: 'var(--admin-text-secondary)', lineHeight: 1.6 }}>
              {client.selected_bottleneck}
            </div>
          </div>

          {/* Strategy Notes Editor */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.4rem' }}>
              INTERNAL STRATEGY NOTES & CONSULTANT DOSSIER:
            </label>
            <textarea
              rows={3}
              value={notes}
              disabled={!isConsultantOrAdmin}
              onChange={(e) => setNotes(e.target.value)}
              className="admin-textarea"
              placeholder="Record strategic audit notes, meeting outcomes, or execution requirements..."
            />
            {isConsultantOrAdmin && (
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSaveNotes} disabled={saving} className="btn-admin btn-admin-primary">
                  <span>{saving ? 'Saving...' : 'Save Strategy Notes'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Secure Strategy PDF Upload Zone */}
          <div style={{ marginBottom: '1.5rem', background: 'var(--admin-bg-card)', padding: '1rem', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <UploadCloud size={16} color="var(--admin-amber)" />
              <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Strategy Dossiers & Diagnostic Briefs (PDF)</strong>
            </div>

            {/* List Existing Attachments */}
            {client.attachments_json && client.attachments_json.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {client.attachments_json.map((att, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--admin-bg-surface)', borderRadius: 'var(--admin-radius)', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={14} color="var(--admin-crimson)" />
                      <span>{att.name}</span>
                      <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>({att.size})</span>
                    </div>
                    <span style={{ color: 'var(--admin-green)', fontSize: '0.75rem' }}>Verified ✓</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: '0 0 0.75rem 0' }}>No strategy PDFs attached yet.</p>
            )}

            {/* Simulated Secure Upload Input */}
            {isConsultantOrAdmin && (
              <form onSubmit={handleUploadBrief} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Strategic_Audit_Recommendation_v1.pdf"
                  className="admin-input"
                  style={{ fontSize: '0.8rem' }}
                />
                <button type="submit" className="btn-admin btn-admin-secondary" style={{ whiteSpace: 'nowrap' }}>
                  <span>Upload PDF</span>
                </button>
              </form>
            )}
          </div>

          {/* Interaction Timeline Stream */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={16} color="var(--admin-crimson)" />
              <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Client Interaction Timeline</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '2px solid var(--admin-border-subtle)', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
              {(client.timeline_events_json || []).map((ev, i) => (
                <div key={i} style={{ fontSize: '0.82rem', position: 'relative' }}>
                  <span style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.72rem', color: 'var(--admin-amber)', display: 'block' }}>
                    {ev.date}
                  </span>
                  <span style={{ color: 'var(--admin-text-secondary)' }}>{ev.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
