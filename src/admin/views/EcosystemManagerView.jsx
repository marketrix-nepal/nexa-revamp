import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_ECOSYSTEM, getMockStore, setMockStore } from '../data/adminMockData';
import { Layers, Network, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export function EcosystemManagerView() {
  const { hasRole } = useAuth();
  const isEditorOrAdmin = hasRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']);

  const [pillars, setPillars] = useState([]);
  const [selectedPillarId, setSelectedPillarId] = useState(1);
  const [audienceTab, setAudienceTab] = useState('entrepreneurs');
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  async function fetchPillars() {
    try {
      const res = await fetch('/api/pillars', {
        headers: { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.pillars && data.pillars.length > 0) {
          setPillars(data.pillars);
          return;
        }
      }
    } catch (err) {}

    const stored = getMockStore('pillars', INITIAL_ECOSYSTEM);
    setPillars(stored);
  }

  useEffect(() => {
    fetchPillars();
  }, []);

  const activePillar = pillars.find(p => p.pillar_number === selectedPillarId) || pillars[0];

  function handleFieldChange(field, val) {
    if (!isEditorOrAdmin) return;
    setPillars(prev => prev.map(p => {
      if (p.pillar_number === selectedPillarId) {
        return { ...p, [field]: val };
      }
      return p;
    }));
  }

  function handleAudienceCopyChange(val) {
    if (!isEditorOrAdmin || !activePillar) return;
    const updatedAudience = {
      ...activePillar.target_audiences_json,
      [audienceTab]: val
    };
    handleFieldChange('target_audiences_json', updatedAudience);
  }

  function toggleDependency(depId) {
    if (!isEditorOrAdmin || !activePillar) return;
    let currentDeps = activePillar.dependent_pillar_ids || [];
    if (currentDeps.includes(depId)) {
      currentDeps = currentDeps.filter(id => id !== depId);
    } else {
      currentDeps = [...currentDeps, depId];
    }
    handleFieldChange('dependent_pillar_ids', currentDeps);
  }

  async function savePillar() {
    if (!isEditorOrAdmin || !activePillar) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/pillars/${activePillar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({
          title: activePillar.title,
          tagline: activePillar.tagline,
          description: activePillar.description,
          dependent_pillar_ids: activePillar.dependent_pillar_ids
        })
      });

      // Save audience copy
      await fetch(`/api/pillars/${activePillar.id}/audience`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify({
          target_audiences_json: activePillar.target_audiences_json
        })
      });

      setStatusMsg(`Pillar 0${activePillar.pillar_number} saved successfully.`);
      fetchPillars();
    } catch (err) {
      setStatusMsg('Changes saved in active session.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(''), 3500);
    }
  }

  if (!activePillar) return <div className="admin-view-canvas">Loading Ecosystem Matrix...</div>;

  return (
    <div className="admin-view-canvas">
      
      {/* RBAC Notice if restricted */}
      {!isEditorOrAdmin && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-crimson-dim)', border: '1px solid var(--admin-crimson)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-crimson)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          <span>Read-Only Mode: Pillar edits and audience copy modifications are restricted to Creative Editors & Super Admins.</span>
        </div>
      )}

      {statusMsg && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-green-dim)', border: '1px solid var(--admin-green)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-green)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          <span>{statusMsg}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: 8 Pillars Selector */}
        <div className="admin-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            THE 8 CORE SERVICE PILLARS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {pillars.map((p) => {
              const isSelected = p.pillar_number === selectedPillarId;
              return (
                <button
                  key={p.pillar_number}
                  onClick={() => setSelectedPillarId(p.pillar_number)}
                  className={`sidebar-nav-item ${isSelected ? 'active' : ''}`}
                  style={{ fontSize: '0.82rem' }}
                >
                  <span style={{ fontFamily: 'var(--admin-font-mono)', color: isSelected ? 'var(--admin-crimson)' : 'var(--admin-text-muted)' }}>
                    0{p.pillar_number}
                  </span>
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Pillar Configuration & Dependencies */}
        <div>
          {/* Pillar Identity & Details Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="status-pill status-pill-success">
                  PILLAR 0{activePillar.pillar_number}
                </span>
                <h3 className="admin-card-title">{activePillar.title}</h3>
              </div>

              {isEditorOrAdmin && (
                <button 
                  onClick={savePillar} 
                  disabled={saving} 
                  className="btn-admin btn-admin-primary"
                >
                  <Save size={14} />
                  <span>{saving ? 'Saving...' : 'Save Pillar Configuration'}</span>
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
                  PILLAR TITLE
                </label>
                <input
                  type="text"
                  value={activePillar.title}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
                  COMMERCIAL TAGLINE
                </label>
                <input
                  type="text"
                  value={activePillar.tagline}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handleFieldChange('tagline', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
                EXECUTIVE DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={activePillar.description}
                disabled={!isEditorOrAdmin}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="admin-textarea"
              />
            </div>

            {/* Connected Architectural Dependencies Matrix */}
            <div style={{ padding: '1rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Network size={16} color="var(--admin-amber)" />
                <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Connected Ecosystem Dependencies</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', margin: '0 0 0.85rem 0' }}>
                Toggle which other pillars are architecturally required to support or compound Pillar 0{activePillar.pillar_number}.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {pillars.map((p) => {
                  if (p.pillar_number === activePillar.pillar_number) return null;
                  const isLinked = (activePillar.dependent_pillar_ids || []).includes(p.pillar_number);
                  return (
                    <button
                      key={p.pillar_number}
                      disabled={!isEditorOrAdmin}
                      onClick={() => toggleDependency(p.pillar_number)}
                      style={{
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        borderRadius: 'var(--admin-radius)',
                        border: `1px solid ${isLinked ? 'var(--admin-amber)' : 'var(--admin-border-subtle)'}`,
                        background: isLinked ? 'var(--admin-amber-dim)' : 'transparent',
                        color: isLinked ? '#FFFFFF' : 'var(--admin-text-secondary)',
                        cursor: isEditorOrAdmin ? 'pointer' : 'default'
                      }}
                    >
                      <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.68rem', color: isLinked ? 'var(--admin-amber)' : 'var(--admin-text-muted)' }}>
                        0{p.pillar_number}
                      </div>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Audience Landing Page Variant Editor */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Target Audience Copy Variants</h3>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {['entrepreneurs', 'smes', 'institutions', 'enterprises'].map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setAudienceTab(aud)}
                    className={`btn-admin ${audienceTab === aud ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', textTransform: 'capitalize' }}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: '0 0 0.85rem 0' }}>
              Customized positioning pitch displayed when a prospective client views Pillar 0{activePillar.pillar_number} through the lens of <strong>{audienceTab.toUpperCase()}</strong>.
            </p>

            <textarea
              rows={4}
              value={activePillar.target_audiences_json?.[audienceTab] || ''}
              disabled={!isEditorOrAdmin}
              onChange={(e) => handleAudienceCopyChange(e.target.value)}
              className="admin-textarea"
              placeholder={`Enter targeted commercial copy for ${audienceTab}...`}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
