import React, { useState } from 'react';
import { HelpCircle, Plus, Send, Phone, User, MessageSquare } from 'lucide-react';
import { initialEnquiries } from '../dummyData';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Residential');
  const [roomType, setRoomType] = useState('Living Room');
  const [status, setStatus] = useState('New');

  const handleAddEnquiry = (e) => {
    e.preventDefault();
    if (!customerName || !email) return;

    const newEnq = {
      id: `ENQ-20${enquiries.length + 1}`,
      customerName,
      email,
      phone,
      projectType,
      roomType,
      status,
      date: new Date().toISOString().split('T')[0]
    };

    setEnquiries([newEnq, ...enquiries]);
    setShowForm(false);

    // Reset
    setCustomerName('');
    setEmail('');
    setPhone('');
    setProjectType('Residential');
    setRoomType('Living Room');
    setStatus('New');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge-info';
      case 'Contacted': return 'badge-warning';
      case 'Proposal Sent': return 'badge-success';
      default: return 'badge-success';
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Client Enquiries</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Capture leads, define initial design requirements, and track consultation phases.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} />
          <span>{showForm ? 'Hide Form' : 'Log New Enquiry'}</span>
        </button>
      </div>

      {/* Grid Layout for Form & Table */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        
        {/* Enquiries Table */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Enquiry Pipeline</h3>
          
          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Project</th>
                  <th>Scope / Room</th>
                  <th>Date Logged</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{enq.id}</td>
                    <td>
                      <div>
                        <p style={{ fontWeight: '500' }}>{enq.customerName}</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{enq.email}</p>
                      </div>
                    </td>
                    <td>{enq.projectType}</td>
                    <td>{enq.roomType}</td>
                    <td>{enq.date}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(enq.status)}`}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Enquiry Form Panel */}
        {showForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Log Client Enquiry</h3>
            
            <form onSubmit={handleAddEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control" style={{ paddingLeft: '34px' }} placeholder="Arthur Dent" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Send size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" style={{ paddingLeft: '34px' }} placeholder="arthur@hitchhiker.org" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" style={{ paddingLeft: '34px' }} placeholder="+1 (555) 424-2424" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Room Scope</label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} className="form-control" style={{ paddingLeft: '34px' }} placeholder="e.g. Master Bedroom, Dining Hall" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Lead Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="New">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Submit Enquiry
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
