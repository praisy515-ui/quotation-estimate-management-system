import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, UserPlus, Phone, Mail, MapPin, DollarSign, Bookmark, X, Edit2, Trash2 } from 'lucide-react';
import { initialCustomers } from '../dummyData';

export default function Customers() {
  const [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [projectType, setProjectType] = useState('Residential');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setShowAddForm(true);
    }
  }, [searchParams]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setProjectType('Residential');
    setBudget('');
    setStatus('Active');
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newCust = {
      id: `CUST-00${customers.length + 1}`,
      name,
      email,
      phone: phone || '+1 (555) 000-0000',
      address: address || 'N/A',
      projectType,
      budget: budget ? `$${Number(budget).toLocaleString()}` : 'TBD',
      status
    };

    setCustomers([newCust, ...customers]);
    setShowAddForm(false);
    resetForm();
  };

  const startEdit = (customer, e) => {
    e.stopPropagation(); // Prevent opening detail card
    setEditingCustomer(customer);
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
    setProjectType(customer.projectType);
    setBudget(customer.budget.replace(/[^0-9]/g, ''));
    setStatus(customer.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === editingCustomer.id ? {
      ...c,
      name,
      email,
      phone,
      address,
      projectType,
      budget: budget ? `$${Number(budget).toLocaleString()}` : 'TBD',
      status
    } : c));
    
    // Also update selected view if open
    if (selectedCustomer?.id === editingCustomer.id) {
      setSelectedCustomer({
        id: editingCustomer.id,
        name,
        email,
        phone,
        address,
        projectType,
        budget: budget ? `$${Number(budget).toLocaleString()}` : 'TBD',
        status
      });
    }

    setEditingCustomer(null);
    resetForm();
  };

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent opening detail card
    if (window.confirm(`Are you sure you want to remove customer profile ${id}?`)) {
      setCustomers(customers.filter(c => c.id !== id));
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null);
      }
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Customers Directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage client profiles, contact information, and project budgets.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowAddForm(true); resetForm(); }}>
          <UserPlus size={16} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Main Layout Area */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Table & Search section */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, email, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Project Type</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    style={{ cursor: 'pointer', backgroundColor: selectedCustomer?.id === c.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent' }}
                  >
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{c.id}</td>
                    <td style={{ fontWeight: '500' }}>{c.name}</td>
                    <td>{c.projectType}</td>
                    <td>{c.budget}</td>
                    <td>
                      <span className={`badge badge-${c.status === 'Active' || c.status === 'Completed' ? 'success' : 'warning'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={(e) => startEdit(c, e)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', minWidth: 0 }}
                          title="Edit Customer"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(c.id, e)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', minWidth: 0, color: 'var(--danger)', borderColor: 'rgba(230,57,70,0.2)' }}
                          title="Delete Customer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                      No customers found matching search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Details Module Panel */}
        {selectedCustomer && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)' }}>Client Profile</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer ID</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-gold)' }}>{selectedCustomer.id}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '20px', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{selectedCustomer.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Status: <span style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{selectedCustomer.status}</span></p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '14px' }}>{selectedCustomer.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '14px' }}>{selectedCustomer.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-gold)', marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{selectedCustomer.address}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                    <Bookmark size={14} />
                    <span>Project Type</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedCustomer.projectType}</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                    <DollarSign size={14} />
                    <span>Est. Budget</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--success)' }}>{selectedCustomer.budget}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Overlay Form Modal */}
      {showAddForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          className="fade-in"
        >
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setShowAddForm(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '20px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Add New Customer</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Register a new client profile in the studio database.</p>

            <form onSubmit={handleAddCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Customer Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="e.g. Elizabeth Bennet" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="elizabeth@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="+1 (555) 012-3456" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Billing Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2" placeholder="Full mailing address..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Project Category</label>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Budget ($)</label>
                  <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="form-control" placeholder="e.g. 50000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Active">Active</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Overlay Form Modal */}
      {editingCustomer && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          className="fade-in"
        >
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setEditingCustomer(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '20px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Edit Customer Details</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Modify profile fields for {editingCustomer.id}.</p>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Customer Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Billing Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Project Category</label>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Budget ($)</label>
                  <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Active">Active</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingCustomer(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
