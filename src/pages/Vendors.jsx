import React, { useState } from 'react';
import { Truck, Plus, Star, Phone, ShieldCheck, Mail } from 'lucide-react';
import { initialVendors } from '../dummyData';

export default function Vendors() {
  const [vendors, setVendors] = useState(initialVendors);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Stone & Masonry');
  const [rating, setRating] = useState('4.8');
  const [status, setStatus] = useState('Active');

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!name || !contactPerson) return;

    const newVnd = {
      id: `VND-70${vendors.length + 1}`,
      name,
      contactPerson,
      phone,
      category,
      rating: parseFloat(rating) || 4.5,
      status
    };

    setVendors([newVnd, ...vendors]);
    setShowAddForm(false);
    // Reset
    setName('');
    setContactPerson('');
    setPhone('');
    setRating('4.8');
    setStatus('Active');
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'badge-success' : 'badge-warning';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Vendor Partners</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Onboard, review and contact authorized trade suppliers, artisans, and construction contractors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'Register Vendor'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        {/* Table list */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Authorized Vendor Directory</h3>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vendor Partner</th>
                  <th>Trade Scope</th>
                  <th>Primary Contact</th>
                  <th>Quality Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id}>
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{v.id}</td>
                    <td style={{ fontWeight: '500' }}>{v.name}</td>
                    <td>{v.category}</td>
                    <td>
                      <div>
                        <p style={{ fontWeight: '500', fontSize: '13.5px' }}>{v.contactPerson}</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{v.phone}</p>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={13} style={{ fill: 'var(--accent-gold)', color: 'var(--accent-gold)' }} />
                        <span style={{ fontWeight: '600', fontSize: '13px' }}>{v.rating}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add form */}
        {showAddForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Log New Supplier</h3>

            <form onSubmit={handleAddVendor} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Vendor Entity Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="e.g. Classic Timber Framing Ltd" />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person Name</label>
                <input type="text" required value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="form-control" placeholder="e.g. John Doe" />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="+1 (555) 322-1212" />
              </div>

              <div className="form-group">
                <label className="form-label">Supply Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Stone & Masonry">Stone & Masonry</option>
                  <option value="Wood & Millwork">Wood & Millwork</option>
                  <option value="Fixtures & Electrical">Fixtures & Electrical</option>
                  <option value="Upholstery & Fabrics">Upholstery & Fabrics</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Initial Rating</label>
                  <input type="number" step="0.1" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Activity Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Register Partner
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
