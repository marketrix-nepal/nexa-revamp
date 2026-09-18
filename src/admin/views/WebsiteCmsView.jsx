import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getCmsStore, 
  saveCmsStore, 
  resetCmsStore, 
  exportCmsJson,
  DEFAULT_CMS_DATA 
} from '../data/cmsStore';
import { 
  Globe, 
  Save, 
  RotateCcw, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Image as ImageIcon, 
  Sparkles, 
  Plus, 
  Trash2, 
  Copy, 
  Eye, 
  AlertCircle 
} from 'lucide-react';

export function WebsiteCmsView() {
  const { hasRole } = useAuth();
  const isEditorOrAdmin = hasRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']);

  const [store, setStore] = useState(getCmsStore());
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'services' | 'pages' | 'media'
  const [selectedPillarIdx, setSelectedPillarIdx] = useState(0);
  const [pageSubTab, setPageSubTab] = useState('manifesto'); // 'manifesto' | 'methodology' | 'training' | 'concierge'
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [copiedUrl, setCopiedUrl] = useState('');

  // New Media Input State
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState('Services');

  useEffect(() => {
    setStore(getCmsStore());
  }, []);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  }

  function handleSaveAll() {
    if (!isEditorOrAdmin) return;
    setSaving(true);
    const success = saveCmsStore(store);
    setTimeout(() => {
      setSaving(false);
      if (success) {
        showToast('Website content published and edge-synchronized successfully.');
      } else {
        showToast('Error saving CMS content.');
      }
    }, 400);
  }

  function handleReset() {
    if (!isEditorOrAdmin) return;
    if (window.confirm('Are you sure you want to reset all website content back to factory defaults? Any unsaved edits will be lost.')) {
      const def = resetCmsStore();
      setStore(def);
      showToast('Website CMS reset to brand factory defaults.');
    }
  }

  // --- Hero Handlers ---
  function handleHeroChange(field, val) {
    if (!isEditorOrAdmin) return;
    setStore(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  }

  // --- Service Pillars Handlers ---
  function handlePillarChange(idx, field, val) {
    if (!isEditorOrAdmin) return;
    setStore(prev => {
      const updated = [...prev.services];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, services: updated };
    });
  }

  function handleAddDeliverable(idx) {
    if (!isEditorOrAdmin) return;
    const text = window.prompt('Enter new deliverable item:');
    if (!text || !text.trim()) return;
    setStore(prev => {
      const updated = [...prev.services];
      const list = updated[idx].solutionsDeliverables || [];
      updated[idx] = { ...updated[idx], solutionsDeliverables: [...list, text.trim()] };
      return { ...prev, services: updated };
    });
  }

  function handleRemoveDeliverable(idx, dIdx) {
    if (!isEditorOrAdmin) return;
    setStore(prev => {
      const updated = [...prev.services];
      const list = (updated[idx].solutionsDeliverables || []).filter((_, i) => i !== dIdx);
      updated[idx] = { ...updated[idx], solutionsDeliverables: list };
      return { ...prev, services: updated };
    });
  }

  // --- Pages Handlers ---
  function handlePageChange(pageKey, field, val) {
    if (!isEditorOrAdmin) return;
    setStore(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageKey]: {
          ...prev.pages[pageKey],
          [field]: val
        }
      }
    }));
  }

  function handleManifestoPrincipleChange(pIdx, field, val) {
    if (!isEditorOrAdmin) return;
    setStore(prev => {
      const principles = [...(prev.pages.manifesto?.corePrinciples || [])];
      principles[pIdx] = { ...principles[pIdx], [field]: val };
      return {
        ...prev,
        pages: {
          ...prev.pages,
          manifesto: {
            ...prev.pages.manifesto,
            corePrinciples: principles
          }
        }
      };
    });
  }

  // --- Media Vault Handlers ---
  function handleAddMedia(e) {
    e.preventDefault();
    if (!isEditorOrAdmin || !newMediaUrl.trim()) return;
    const item = {
      id: `media-${Date.now()}`,
      name: newMediaName.trim() || 'Untitled Asset',
      category: newMediaCategory,
      url: newMediaUrl.trim()
    };
    setStore(prev => ({
      ...prev,
      mediaVault: [item, ...(prev.mediaVault || [])]
    }));
    setNewMediaName('');
    setNewMediaUrl('');
    showToast('Asset added to Media Vault.');
  }

  function handleRemoveMedia(id) {
    if (!isEditorOrAdmin) return;
    setStore(prev => ({
      ...prev,
      mediaVault: (prev.mediaVault || []).filter(m => m.id !== id)
    }));
    showToast('Asset removed from Vault.');
  }

  function handleCopyUrl(url) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2500);
  }

  function handleAssignToPillar(url) {
    if (!isEditorOrAdmin) return;
    handlePillarChange(selectedPillarIdx, 'image', url);
    showToast(`Assigned asset to Pillar 0${selectedPillarIdx + 1}.`);
  }

  const activePillar = store.services?.[selectedPillarIdx] || store.services?.[0];

  return (
    <div className="admin-view-canvas cms-view-canvas">
      
      {/* Top Banner Status Notification */}
      {toastMsg && (
        <div className="cms-toast-bar">
          <CheckCircle2 size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* RBAC Notice */}
      {!isEditorOrAdmin && (
        <div className="cms-rbac-notice">
          <AlertCircle size={16} />
          <span>Viewing in Read-Only Mode. Publishing website changes requires Creative Editor or Super Admin credentials.</span>
        </div>
      )}

      {/* Header & Main Toolbar */}
      <div className="cms-master-toolbar">
        <div className="cms-toolbar-title-group">
          <div className="cms-toolbar-badge">
            <Globe size={13} />
            <span>WEBSITE CMS & LIVE SYNC</span>
          </div>
          <h2 className="cms-toolbar-title">Website Content Management</h2>
          <p className="cms-toolbar-subtitle">
            Edit live hero messaging, service pillars, page copy, and media assets with instant edge persistence.
          </p>
        </div>

        <div className="cms-toolbar-actions">
          <button 
            onClick={exportCmsJson} 
            className="btn-admin btn-admin-secondary"
            title="Download CMS Backup as JSON"
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>

          {isEditorOrAdmin && (
            <button 
              onClick={handleReset} 
              className="btn-admin btn-admin-secondary"
              title="Reset all content to original brand defaults"
            >
              <RotateCcw size={14} />
              <span>Defaults</span>
            </button>
          )}

          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-admin btn-admin-secondary"
            title="Open Live Public Website"
          >
            <Eye size={14} />
            <span>Preview Site</span>
          </a>

          {isEditorOrAdmin && (
            <button 
              onClick={handleSaveAll} 
              disabled={saving} 
              className="btn-admin btn-admin-primary cms-save-btn"
            >
              <Save size={14} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Modular Sub-Tabs Bar */}
      <div className="cms-subtabs-nav" role="tablist">
        <button 
          onClick={() => setActiveTab('hero')} 
          className={`cms-subtab-btn ${activeTab === 'hero' ? 'active' : ''}`}
        >
          <Sparkles size={14} />
          <span>Hero & Banners</span>
        </button>

        <button 
          onClick={() => setActiveTab('services')} 
          className={`cms-subtab-btn ${activeTab === 'services' ? 'active' : ''}`}
        >
          <Layers size={14} />
          <span>Services (8 Pillars)</span>
        </button>

        <button 
          onClick={() => setActiveTab('pages')} 
          className={`cms-subtab-btn ${activeTab === 'pages' ? 'active' : ''}`}
        >
          <FileText size={14} />
          <span>Pages & Copy</span>
        </button>

        <button 
          onClick={() => setActiveTab('media')} 
          className={`cms-subtab-btn ${activeTab === 'media' ? 'active' : ''}`}
        >
          <ImageIcon size={14} />
          <span>Media Vault</span>
          <span className="cms-tab-count">{(store.mediaVault || []).length}</span>
        </button>
      </div>

      {/* TAB 1: HERO & BANNERS */}
      {activeTab === 'hero' && (
        <div className="cms-tab-content">
          <div className="cms-grid-dual">
            
            {/* Left: Hero Copy Fields */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Hero Typography & Narrative</h3>
                <span className="status-pill status-pill-success">ACT 1 OVERTURE</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">ANNOUNCEMENT TICKER</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={store.hero?.announcement || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handleHeroChange('announcement', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. OPERATIONAL · AUCKLAND HQ & SINGAPORE HUB"
                  />
                  <button
                    type="button"
                    onClick={() => handleHeroChange('showAnnouncement', !store.hero?.showAnnouncement)}
                    className={`btn-admin ${store.hero?.showAnnouncement ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                    style={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                  >
                    {store.hero?.showAnnouncement ? 'Active' : 'Muted'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">CATEGORY KICKER / SUBLABEL</label>
                <input
                  type="text"
                  value={store.hero?.sublabel || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handleHeroChange('sublabel', e.target.value)}
                  className="admin-input"
                  placeholder="e.g. STRATEGY · TECHNOLOGY · GROWTH"
                />
              </div>

              <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="cms-field-label">PRIMARY HEADLINE (GRADIENT)</label>
                  <input
                    type="text"
                    value={store.hero?.titleGradient || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handleHeroChange('titleGradient', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Transforming Ideas Into Brands,"
                  />
                </div>
                <div>
                  <label className="cms-field-label">HEADLINE ACCENT (WHITE)</label>
                  <input
                    type="text"
                    value={store.hero?.titleAccent || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handleHeroChange('titleAccent', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Digital Solutions & Growth Systems."
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">EXECUTIVE VALUE THESIS (LEAD PARAGRAPH)</label>
                <textarea
                  rows={4}
                  value={store.hero?.executiveLead || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handleHeroChange('executiveLead', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-2">
                <div>
                  <label className="cms-field-label">PRIMARY CTA LABEL</label>
                  <input
                    type="text"
                    value={store.hero?.primaryCtaText || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handleHeroChange('primaryCtaText', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="cms-field-label">SECONDARY CTA LABEL</label>
                  <input
                    type="text"
                    value={store.hero?.secondaryCtaText || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handleHeroChange('secondaryCtaText', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* Right: Live Visual Preview Card */}
            <div className="admin-card cms-preview-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Live Typography Render</h3>
                <span className="cms-preview-badge">LIVE PREVIEW</span>
              </div>

              <div className="cms-mock-hero-preview">
                {store.hero?.showAnnouncement && (
                  <div className="cms-preview-ticker">
                    <span className="pulse-indicator-dot"></span>
                    <span>{store.hero?.announcement}</span>
                  </div>
                )}
                <div className="cms-preview-sublabel">{store.hero?.sublabel}</div>
                <h2 className="cms-preview-heading">
                  <span className="hero-title-gradient">{store.hero?.titleGradient} </span>
                  <span className="hero-title-accent">{store.hero?.titleAccent}</span>
                </h2>
                <p className="cms-preview-lead">{store.hero?.executiveLead}</p>
                <div className="cms-preview-buttons">
                  <span className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                    {store.hero?.primaryCtaText}
                  </span>
                  <span className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                    {store.hero?.secondaryCtaText}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: SERVICES & 8 PILLARS */}
      {activeTab === 'services' && (
        <div className="cms-tab-content">
          <div className="ecosystem-manager-grid">
            
            {/* Left: 8 Pillars Selector Track */}
            <div className="admin-card ecosystem-selector-card">
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-text-muted)', marginBottom: '0.65rem' }}>
                SELECT PILLAR TO CONFIGURE
              </div>
              <div className="ecosystem-pillars-track">
                {(store.services || []).map((p, idx) => {
                  const isSelected = idx === selectedPillarIdx;
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => setSelectedPillarIdx(idx)}
                      className={`ecosystem-pillar-chip ${isSelected ? 'active' : ''}`}
                    >
                      <span className="pillar-chip-num">0{idx + 1}</span>
                      <span className="pillar-chip-title">{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Pillar Editor */}
            {activePillar && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="ecosystem-card-title-zone">
                    <span className="status-pill status-pill-success">
                      PILLAR 0{selectedPillarIdx + 1}
                    </span>
                    <h3 className="admin-card-title">{activePillar.title}</h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="cms-status-indicator active">
                      {activePillar.status || 'ACTIVE'}
                    </span>
                  </div>
                </div>

                <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
                  <div>
                    <label className="cms-field-label">PILLAR TITLE</label>
                    <input
                      type="text"
                      value={activePillar.title || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => handlePillarChange(selectedPillarIdx, 'title', e.target.value)}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="cms-field-label">COMMERCIAL TAGLINE</label>
                    <input
                      type="text"
                      value={activePillar.tagline || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => handlePillarChange(selectedPillarIdx, 'tagline', e.target.value)}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="cms-field-label">EXECUTIVE OVERVIEW (SHORT DESC)</label>
                  <textarea
                    rows={2}
                    value={activePillar.shortDesc || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePillarChange(selectedPillarIdx, 'shortDesc', e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="cms-field-label">HERO LEAD PROPOSITION</label>
                  <textarea
                    rows={3}
                    value={activePillar.heroLead || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePillarChange(selectedPillarIdx, 'heroLead', e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                {/* Visual Asset URL with Thumbnail */}
                <div style={{ marginBottom: '1.25rem', padding: '0.85rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
                  <label className="cms-field-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ImageIcon size={13} />
                    <span>SERVICE VISUAL ASSET (IMAGE URL)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {activePillar.image && (
                      <img 
                        src={activePillar.image} 
                        alt={activePillar.title} 
                        className="cms-thumbnail-preview" 
                      />
                    )}
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <input
                        type="url"
                        value={activePillar.image || ''}
                        disabled={!isEditorOrAdmin}
                        onChange={(e) => handlePillarChange(selectedPillarIdx, 'image', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Solutions & Deliverables List */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label className="cms-field-label" style={{ margin: 0 }}>
                      CORE DELIVERABLES ({activePillar.solutionsDeliverables?.length || 0})
                    </label>
                    {isEditorOrAdmin && (
                      <button
                        type="button"
                        onClick={() => handleAddDeliverable(selectedPillarIdx)}
                        className="btn-admin btn-admin-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      >
                        <Plus size={12} />
                        <span>Add Deliverable</span>
                      </button>
                    )}
                  </div>

                  <div className="cms-chips-list">
                    {(activePillar.solutionsDeliverables || []).map((item, dIdx) => (
                      <div key={dIdx} className="cms-deliverable-chip">
                        <span>{item}</span>
                        {isEditorOrAdmin && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDeliverable(selectedPillarIdx, dIdx)}
                            className="cms-chip-remove"
                            title="Remove"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 3: PAGES & CONTENT */}
      {activeTab === 'pages' && (
        <div className="cms-tab-content">
          
          {/* Sub-Tabs for Pages */}
          <div className="cms-pages-subnav">
            <button 
              onClick={() => setPageSubTab('manifesto')} 
              className={`cms-page-pill ${pageSubTab === 'manifesto' ? 'active' : ''}`}
            >
              Anti-Agency Manifesto
            </button>
            <button 
              onClick={() => setPageSubTab('methodology')} 
              className={`cms-page-pill ${pageSubTab === 'methodology' ? 'active' : ''}`}
            >
              Engagement Methodology
            </button>
            <button 
              onClick={() => setPageSubTab('training')} 
              className={`cms-page-pill ${pageSubTab === 'training' ? 'active' : ''}`}
            >
              Executive Workshops
            </button>
            <button 
              onClick={() => setPageSubTab('concierge')} 
              className={`cms-page-pill ${pageSubTab === 'concierge' ? 'active' : ''}`}
            >
              Concierge Advisory Intake
            </button>
          </div>

          {/* Sub-Tab: Manifesto */}
          {pageSubTab === 'manifesto' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Manifesto & Philosophy Copy</h3>
                <span className="status-pill status-pill-success">THE ANTI-AGENCY THESIS</span>
              </div>

              <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="cms-field-label">SECTION LABEL</label>
                  <input
                    type="text"
                    value={store.pages?.manifesto?.sectionLabel || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('manifesto', 'sectionLabel', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="cms-field-label">HEADLINE</label>
                  <input
                    type="text"
                    value={store.pages?.manifesto?.headline || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('manifesto', 'headline', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">SUBHEAD POSITIONING</label>
                <input
                  type="text"
                  value={store.pages?.manifesto?.subhead || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('manifesto', 'subhead', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="cms-field-label">PRIMARY ESSAY / THESIS PARAGRAPH</label>
                <textarea
                  rows={4}
                  value={store.pages?.manifesto?.leadParagraph || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('manifesto', 'leadParagraph', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <label className="cms-field-label">CORE OPERATING PRINCIPLES (3 PILLARS)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(store.pages?.manifesto?.corePrinciples || []).map((p, pIdx) => (
                  <div key={pIdx} style={{ padding: '0.75rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
                    <input
                      type="text"
                      value={p.title || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => handleManifestoPrincipleChange(pIdx, 'title', e.target.value)}
                      placeholder="Principle Title"
                      className="admin-input"
                      style={{ marginBottom: '0.45rem', fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={p.desc || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => handleManifestoPrincipleChange(pIdx, 'desc', e.target.value)}
                      placeholder="Principle Description"
                      className="admin-textarea"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab: Methodology */}
          {pageSubTab === 'methodology' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Engagement Methodology & 3 Phases</h3>
                <span className="status-pill status-pill-success">COMPOUNDING ROADMAP</span>
              </div>

              <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="cms-field-label">SECTION LABEL</label>
                  <input
                    type="text"
                    value={store.pages?.methodology?.sectionLabel || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('methodology', 'sectionLabel', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="cms-field-label">FRAMEWORK HEADLINE</label>
                  <input
                    type="text"
                    value={store.pages?.methodology?.headline || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('methodology', 'headline', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="cms-field-label">LEAD VALUE STATEMENT</label>
                <textarea
                  rows={3}
                  value={store.pages?.methodology?.lead || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('methodology', 'lead', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <label className="cms-field-label">METHODOLOGY PHASES</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(store.pages?.methodology?.phases || []).map((ph, phIdx) => (
                  <div key={phIdx} style={{ padding: '0.75rem', background: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border-subtle)', borderRadius: 'var(--admin-radius)' }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--admin-font-mono)', color: 'var(--admin-crimson)', marginBottom: '0.35rem' }}>
                      {ph.step}
                    </div>
                    <input
                      type="text"
                      value={ph.name || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => {
                        const phases = [...(store.pages?.methodology?.phases || [])];
                        phases[phIdx] = { ...phases[phIdx], name: e.target.value };
                        handlePageChange('methodology', 'phases', phases);
                      }}
                      className="admin-input"
                      style={{ marginBottom: '0.45rem', fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={ph.desc || ''}
                      disabled={!isEditorOrAdmin}
                      onChange={(e) => {
                        const phases = [...(store.pages?.methodology?.phases || [])];
                        phases[phIdx] = { ...phases[phIdx], desc: e.target.value };
                        handlePageChange('methodology', 'phases', phases);
                      }}
                      className="admin-textarea"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab: Training */}
          {pageSubTab === 'training' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Executive Masterclasses & Training</h3>
                <span className="status-pill status-pill-success">UPSKILLING</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">SECTION LABEL</label>
                <input
                  type="text"
                  value={store.pages?.training?.sectionLabel || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('training', 'sectionLabel', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">HEADLINE</label>
                <input
                  type="text"
                  value={store.pages?.training?.headline || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('training', 'headline', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">PROGRAM DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={store.pages?.training?.lead || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('training', 'lead', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          )}

          {/* Sub-Tab: Concierge */}
          {pageSubTab === 'concierge' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Concierge Advisory & Commercial Intake</h3>
                <span className="status-pill status-pill-success">LEAD INTAKE</span>
              </div>

              <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="cms-field-label">SECTION LABEL</label>
                  <input
                    type="text"
                    value={store.pages?.concierge?.sectionLabel || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('concierge', 'sectionLabel', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="cms-field-label">MAIN INTAKE HEADLINE</label>
                  <input
                    type="text"
                    value={store.pages?.concierge?.headline || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('concierge', 'headline', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="cms-field-label">PROMPT & RESPONSE EXPECTATION LEAD</label>
                <textarea
                  rows={3}
                  value={store.pages?.concierge?.lead || ''}
                  disabled={!isEditorOrAdmin}
                  onChange={(e) => handlePageChange('concierge', 'lead', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-2">
                <div>
                  <label className="cms-field-label">DIRECT PHONE NUMBER</label>
                  <input
                    type="text"
                    value={store.pages?.concierge?.directPhone || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('concierge', 'directPhone', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="cms-field-label">EXECUTIVE INTAKE EMAIL</label>
                  <input
                    type="email"
                    value={store.pages?.concierge?.directEmail || ''}
                    disabled={!isEditorOrAdmin}
                    onChange={(e) => handlePageChange('concierge', 'directEmail', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: MEDIA VAULT */}
      {activeTab === 'media' && (
        <div className="cms-tab-content">
          
          {/* Add New Asset Form */}
          {isEditorOrAdmin && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Add Asset to Media Vault</h3>
                <span className="status-pill status-pill-success">IMAGE REPOSITORY</span>
              </div>
              <form onSubmit={handleAddMedia} className="cms-media-add-form">
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label className="cms-field-label">ASSET NAME</label>
                  <input
                    type="text"
                    value={newMediaName}
                    onChange={(e) => setNewMediaName(e.target.value)}
                    placeholder="e.g. Hero Neural Background"
                    className="admin-input"
                  />
                </div>

                <div style={{ flex: 2, minWidth: '240px' }}>
                  <label className="cms-field-label">IMAGE URL</label>
                  <input
                    type="url"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="admin-input"
                    required
                  />
                </div>

                <div style={{ width: '140px' }}>
                  <label className="cms-field-label">CATEGORY</label>
                  <select
                    value={newMediaCategory}
                    onChange={(e) => setNewMediaCategory(e.target.value)}
                    className="admin-select"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Services">Services</option>
                    <option value="Brand">Brand</option>
                    <option value="Graphics">Graphics</option>
                  </select>
                </div>

                <div style={{ alignSelf: 'flex-end' }}>
                  <button type="submit" className="btn-admin btn-admin-primary">
                    <Plus size={14} />
                    <span>Add to Vault</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Media Grid */}
          <div className="cms-media-grid">
            {(store.mediaVault || []).map((asset) => (
              <div key={asset.id} className="cms-media-card">
                <div className="cms-media-preview-box">
                  <img src={asset.url} alt={asset.name} loading="lazy" />
                  <span className="cms-media-cat-pill">{asset.category}</span>
                </div>

                <div className="cms-media-card-body">
                  <div className="cms-media-title">{asset.name}</div>
                  <div className="cms-media-url-mono" title={asset.url}>
                    {asset.url}
                  </div>

                  <div className="cms-media-card-actions">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(asset.url)}
                      className="btn-admin btn-admin-secondary"
                      style={{ flex: 1, fontSize: '0.72rem', padding: '0.3rem 0.5rem', justifyContent: 'center' }}
                    >
                      <Copy size={12} />
                      <span>{copiedUrl === asset.url ? 'Copied!' : 'Copy URL'}</span>
                    </button>

                    {isEditorOrAdmin && (
                      <button
                        type="button"
                        onClick={() => handleAssignToPillar(asset.url)}
                        className="btn-admin btn-admin-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.3rem 0.5rem' }}
                        title={`Assign to Pillar 0${selectedPillarIdx + 1}`}
                      >
                        Assign to P0{selectedPillarIdx + 1}
                      </button>
                    )}

                    {isEditorOrAdmin && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(asset.id)}
                        className="btn-admin btn-admin-secondary"
                        style={{ padding: '0.3rem 0.45rem', color: 'var(--admin-crimson)' }}
                        title="Delete from Vault"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
