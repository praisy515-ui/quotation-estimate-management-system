import React, { useState } from 'react';
import { LifeBuoy, Plus, HelpCircle, Check, Send } from 'lucide-react';

export default function Support() {
  const [tickets, setTickets] = useState([
    { id: 'TCK-101', subject: 'Recharts area graphs rendering sluggishly on iPad', category: 'Software Issue', date: '2026-06-05', status: 'Resolved', reply: 'Graphics acceleration CSS added.' },
    { id: 'TCK-102', subject: 'Quotation builder discount cap modification', category: 'Feature Request', date: '2026-06-11', status: 'Open', reply: 'Assigned to tech team review.' },
  ]);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Software Issue');
  const [description, setDescription] = useState('');

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!subject || !description) return;

    const newTck = {
      id: `TCK-10${tickets.length + 1}`,
      subject,
      category,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      reply: 'Ticket logged. A developer will contact you shortly.'
    };

    setTickets([newTck, ...tickets]);
    setSubject('');
    setDescription('');
    alert('Support ticket logged with engineering desk successfully!');
  };

  const getStatusBadge = (status) => {
    return status === 'Resolved' ? 'badge-success' : 'badge-warning';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Studio Support</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Submit software bugs, layout requests, or technical issues to the system administration.</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        
        {/* Active tickets */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Help Desk History</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tickets.map((t) => (
              <div key={t.id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.id} • {t.category}</span>
                  <span className={`badge ${getStatusBadge(t.status)}`}>{t.status}</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{t.subject}</h4>
                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px', marginTop: '4px', fontSize: '12px' }}>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>Developer Response: </span>
                  <span style={{ color: 'var(--text-muted)' }}>"{t.reply}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create ticket form */}
        <div className="glass-panel" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Submit Support Ticket</h3>

          <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Subject Title</label>
              <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" placeholder="e.g. Cannot upload high-res before-after image" />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                <option value="Software Issue">Software Issue / Bug</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing Account">Billing & Profile Account</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" rows="4" placeholder="Please explain the technical details..." />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <Send size={14} /> Submit Ticket
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
