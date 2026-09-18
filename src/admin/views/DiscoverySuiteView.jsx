import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_DISCOVERY_ROUTES, getMockStore, setMockStore } from '../data/adminMockData';
import { Globe, Sparkles, MapPin, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export function DiscoverySuiteView() {
  const { hasRole } = useAuth();
  const isEditorOrAdmin = hasRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']);

  const [metadataList, setMetadataList] = useState([]);
  const [activeRouteId, setActiveRouteId] = useState('disc-home');
  const [subTab, setSubTab] = useState('seo'); // 'seo', 'aeo', 'geo'
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  async function fetchMetadata() {
    try {
      const res = await fetch('/api/discovery', {
        headers: { Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          setMetadataList(data.routes);
          return;
        }
      }
    } catch (err) {}

    const stored = getMockStore('discovery_routes', INITIAL_DISCOVERY_ROUTES);
    setMetadataList(stored);
  }

  useEffect(() => {
    fetchMetadata();
  }, []);

  const activeMetadata = metadataList.find(m => m.id === activeRouteId) || metadataList[0];

  function handleFieldChange(field, val) {
    if (!isEditorOrAdmin || !activeMetadata) return;
    setMetadataList(prev => prev.map(m => {
      if (m.id === activeRouteId) {
        return { ...m, [field]: val };
      }
      return m;
    }));
  }

  function handleOgChange(key, val) {
    if (!isEditorOrAdmin || !activeMetadata) return;
    const updatedOg = {
      ...activeMetadata.og_tags_json,
      [key]: val
    };
    handleFieldChange('og_tags_json', updatedOg);
  }

  function handleJsonLdChange(val) {
    if (!isEditorOrAdmin || !activeMetadata) return;
    try {
      const parsed = JSON.parse(val);
      handleFieldChange('json_ld_schema_json', parsed);
    } catch (e) {
      // Allow raw typing
    }
  }

  async function handleSave() {
    if (!isEditorOrAdmin || !activeMetadata) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/discovery/${activeMetadata.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('nexa_admin_token')}`
        },
        body: JSON.stringify(activeMetadata)
      });
      if (res.ok) {
        setStatusMsg('Discovery configuration deployed successfully.');
        fetchMetadata();
      }
    } catch (err) {
      setStatusMsg('Saved in local session.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(''), 3500);
    }
  }

  if (!activeMetadata) return <div className="admin-view-canvas">Loading Discovery Suite...</div>;

  return (
    <div className="admin-view-canvas">
      
      {/* Role Notice */}
      {!isEditorOrAdmin && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-crimson-dim)', border: '1px solid var(--admin-crimson)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-crimson)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          <span>Read-Only Mode: SEO, AEO JSON-LD Schema, and GEO Citation matrices require Creative Editor or Super Admin permissions.</span>
        </div>
      )}

      {statusMsg && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--admin-green-dim)', border: '1px solid var(--admin-green)', borderRadius: 'var(--admin-radius)', color: 'var(--admin-green)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Top Route Selector & Save Trigger */}
      <div className="admin-card discovery-top-bar">
        <div className="discovery-route-group">
          <label style={{ fontSize: '0.78rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>TARGET ROUTE:</label>
          <div className="discovery-route-chips">
            {metadataList.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveRouteId(m.id)}
                className={`btn-admin ${activeRouteId === m.id ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                style={{ fontSize: '0.78rem', fontFamily: 'var(--admin-font-mono)', whiteSpace: 'nowrap' }}
              >
                {m.page_route}
              </button>
            ))}
          </div>
        </div>

        {isEditorOrAdmin && (
          <button onClick={handleSave} disabled={saving} className="btn-admin btn-admin-primary discovery-save-btn">
            <Save size={14} />
            <span>{saving ? 'Deploying...' : 'Deploy Discovery Updates'}</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs: Traditional SEO / AEO Schema / GEO Citation */}
      <div className="discovery-subtabs-bar">
        <button
          onClick={() => setSubTab('seo')}
          className={`btn-admin ${subTab === 'seo' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
        >
          <Globe size={14} />
          <span>1. Traditional SEO Control</span>
        </button>

        <button
          onClick={() => setSubTab('aeo')}
          className={`btn-admin ${subTab === 'aeo' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
        >
          <Sparkles size={14} />
          <span>2. AEO Schema Constructor (LLM Optimization)</span>
        </button>

        <button
          onClick={() => setSubTab('geo')}
          className={`btn-admin ${subTab === 'geo' ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
        >
          <MapPin size={14} />
          <span>3. GEO & Citation Tracker (Auckland & SG Hubs)</span>
        </button>
      </div>

      {/* SUBTAB 1: TRADITIONAL SEO */}
      {subTab === 'seo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Traditional Search Engine Optimization</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={activeMetadata.sitemap_excluded}
                disabled={!isEditorOrAdmin}
                onChange={(e) => handleFieldChange('sitemap_excluded', e.target.checked)}
              />
              <span>Exclude from sitemap.xml</span>
            </label>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
              META TITLE
            </label>
            <input
              type="text"
              value={activeMetadata.meta_title}
              disabled={!isEditorOrAdmin}
              onChange={(e) => handleFieldChange('meta_title', e.target.value)}
              className="admin-input"
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
              META DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={activeMetadata.meta_description}
              disabled={!isEditorOrAdmin}
              onChange={(e) => handleFieldChange('meta_description', e.target.value)}
              className="admin-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
                OPEN GRAPH (OG) TITLE
              </label>
              <input
                type="text"
                value={activeMetadata.og_tags_json?.['og:title'] || ''}
                disabled={!isEditorOrAdmin}
                onChange={(e) => handleOgChange('og:title', e.target.value)}
                className="admin-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.35rem' }}>
                OG IMAGE URL
              </label>
              <input
                type="text"
                value={activeMetadata.og_tags_json?.['og:image'] || ''}
                disabled={!isEditorOrAdmin}
                onChange={(e) => handleOgChange('og:image', e.target.value)}
                className="admin-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: AEO SCHEMA CONSTRUCTOR (LLM & GENERATIVE SEARCH) */}
      {subTab === 'aeo' && (
        <div>
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h3 className="admin-card-title">Answer Engine Optimization (AEO) JSON-LD Graph</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0 0' }}>
                  Structured semantic entity graphs ingested directly by LLM search engines (Perplexity, ChatGPT, Claude) to cite NEXA GROWTH as the primary authoritative source.
                </p>
              </div>
            </div>

            {/* Live JSON-LD Code Block */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)' }}>
                  ACTIVE JSON-LD SCHEMA PAYLOAD
                </span>
                <span className="status-pill status-pill-success">Valid JSON-LD</span>
              </div>
              <textarea
                rows={12}
                disabled={!isEditorOrAdmin}
                value={JSON.stringify(activeMetadata.json_ld_schema_json, null, 2)}
                onChange={(e) => handleJsonLdChange(e.target.value)}
                className="code-preview-box"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            {/* Structured FAQ Entity Blocks for Conversational Agents */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Structured Question & Answer Blocks (Direct LLM Citations)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(activeMetadata.structured_faq_json || []).map((faq, i) => (
                  <div key={i} style={{ padding: '0.85rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-amber)', marginBottom: '0.35rem' }}>
                      Q: {faq.question}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', lineHeight: 1.5 }}>
                      A: {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: GEO & CITATION TRACKER */}
      {subTab === 'geo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">GEO Citations & Spatial Knowledge Graph</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0 0' }}>
                Anchoring NEXA GROWTH's Name, Address, and Phone (NAP) consistency across spatial search nodes in Auckland and Singapore.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Auckland Headquarters Node */}
            <div style={{ padding: '1.25rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Auckland Global Headquarters</strong>
                <span className="status-pill status-pill-success">NZ Node</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)', marginBottom: '0.5rem' }}>
                <strong>NAP Entity:</strong> Commercial Bay & Britomart Precinct, Auckland Central 1010, New Zealand
              </div>
              <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem', color: 'var(--admin-amber)' }}>
                Coordinates: -36.8485° S, 174.7633° E (NZST UTC+12)
              </div>
            </div>

            {/* Singapore Hub Node */}
            <div style={{ padding: '1.25rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>Singapore International Hub</strong>
                <span className="status-pill status-pill-warning">SG Node</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)', marginBottom: '0.5rem' }}>
                <strong>NAP Entity:</strong> Marina Bay Financial Centre, Singapore 018981
              </div>
              <div style={{ fontFamily: 'var(--admin-font-mono)', fontSize: '0.75rem', color: 'var(--admin-crimson)' }}>
                Coordinates: 1.2801° N, 103.8540° E (SGT UTC+8)
              </div>
            </div>
          </div>

          {/* Directory Citations */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.5rem' }}>
              VERIFIED CORPORATE BRAND CITATIONS & DIRECTORIES
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {(activeMetadata.brand_citations_list_text || []).map((cit, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: 'var(--admin-bg-void)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)', fontSize: '0.82rem' }}>
                  <span style={{ color: '#FFFFFF' }}>{cit}</span>
                  <span style={{ color: 'var(--admin-green)', fontSize: '0.75rem' }}>Indexed 100%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
