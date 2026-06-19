import React, { useState } from 'react';
import { ClipboardCheck, Plus, Check, AlertCircle, MessageSquare, Send } from 'lucide-react';
import { initialApprovals } from '../dummyData';

export default function Approvals() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [designName, setDesignName] = useState('');
  const [comments, setComments] = useState('');

  const handleAddApproval = (e) => {
    e.preventDefault();
    if (!customerName || !designName) return;

    const newApp = {
      id: `APP-90${approvals.length + 1}`,
      customerName,
      designName,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      comments: comments || 'Review scheduled with designer.'
    };

    setApprovals([newApp, ...approvals]);
    setShowAddForm(false);
    // Reset
    setCustomerName('');
    setDesignName('');
    setComments('');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setApprovals(approvals.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const getStatusBadge = (status) => {
    if (status === 'Approved') return 'badge-success';
    if (status === 'Submitted') return 'badge-info';
    return 'badge-warning';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Design Approvals</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Submit concepts and blueprints to clients, track feedback, and log signing contracts.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'Submit Rendering'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        
        {/* Approvals List */}
        <div style={{ flex: 2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {approvals.map((app) => (
            <div
              key={app.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderLeft: `4px solid ${
                  app.status === 'Approved' ? 'var(--success)' : app.status === 'Submitted' ? 'var(--info)' : 'var(--warning)'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{app.id} • Submitted: {app.submittedDate}</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: '2px' }}>{app.designName}</h4>
                </div>
                <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer</p>
                  <p style={{ fontSize: '14px', fontWeight: '600' }}>{app.customerName}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageSquare size={12} />
                    <span>Client Remarks</span>
                  </p>
                  <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{app.comments}"</p>
                </div>
              </div>

              {/* Action approvals */}
              {app.status !== 'Approved' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px dotted var(--border-color)', paddingTop: '10px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleUpdateStatus(app.id, 'Revision Requested')} style={{ color: 'var(--warning)' }}>
                    <AlertCircle size={12} /> Request Changes
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleUpdateStatus(app.id, 'Approved')}>
                    <Check size={12} /> Approve Concept
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Rendering Form */}
        {showAddForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Log Proposal</h3>

            <form onSubmit={handleAddApproval} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control" placeholder="Sophia Loren" />
              </div>

              <div className="form-group">
                <label className="form-label">Blueprints / Layout Title</label>
                <input type="text" required value={designName} onChange={(e) => setDesignName(e.target.value)} className="form-control" placeholder="e.g. Master Bedroom Ceiling Blueprint" />
              </div>

              <div className="form-group">
                <label className="form-label">Designer Specifications / Notes</label>
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="form-control" rows="3" placeholder="Explain details of proposal..." />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Submit For Review
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
