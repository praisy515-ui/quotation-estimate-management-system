import React, { useState } from 'react';
import { CreditCard, Plus, Search, DollarSign, Wallet, AlertTriangle } from 'lucide-react';
import { initialPayments } from '../dummyData';

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Wire Transfer');
  const [status, setStatus] = useState('Pending');

  const filteredPayments = payments.filter(p =>
    p.customerName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!customerName || !amount) return;

    const newPay = {
      id: `INV-80${payments.length + 1}`,
      customerName,
      amount: `$${Number(amount).toLocaleString()}`,
      date: new Date().toISOString().split('T')[0],
      status,
      method
    };

    setPayments([newPay, ...payments]);
    setShowAddForm(false);
    // Reset
    setCustomerName('');
    setAmount('');
    setStatus('Pending');
  };

  const getStatusClass = (status) => {
    if (status === 'Paid') return 'badge-success';
    if (status === 'Pending') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Payments & Billing</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Log incoming retainer deposits, dispatch client progress invoices, and monitor collections.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'New Invoice'}</span>
        </button>
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(82, 183, 136, 0.1)', color: 'var(--success)' }}>
            <Wallet size={24} />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Received Revenue</p>
            <h4 style={{ fontSize: '20px', fontWeight: '700' }}>$25,500</h4>
          </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(242, 166, 90, 0.1)', color: 'var(--warning)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Outstanding Invoices</p>
            <h4 style={{ fontSize: '20px', fontWeight: '700' }}>$36,000</h4>
          </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(230, 57, 70, 0.1)', color: 'var(--danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Overdue Receivables</p>
            <h4 style={{ fontSize: '20px', fontWeight: '700' }}>$75,000</h4>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        {/* Table tracking */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search invoices by client or ID..."
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
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date Issued</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{p.id}</td>
                    <td style={{ fontWeight: '500' }}>{p.customerName}</td>
                    <td style={{ fontWeight: '600' }}>{p.amount}</td>
                    <td>{p.date}</td>
                    <td>{p.method}</td>
                    <td>
                      <span className={`badge ${getStatusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Invoice Form */}
        {showAddForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Create Invoice</h3>

            <form onSubmit={handleAddPayment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control" placeholder="e.g. Elon Musk" />
              </div>

              <div className="form-group">
                <label className="form-label">Billing Amount ($)</label>
                <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" placeholder="e.g. 15000" />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method Term</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Wire Transfer">Wire Transfer</option>
                  <option value="Net 30">Net 30 Invoice</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Pending">Pending Review</option>
                  <option value="Paid">Paid Retainer</option>
                  <option value="Overdue">Overdue Balance</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Dispatch Invoice
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
