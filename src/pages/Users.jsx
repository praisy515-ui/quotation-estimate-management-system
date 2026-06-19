import React, { useState } from 'react';
import { UserCheck, Plus, ShieldAlert, Mail } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([
    { id: 'USR-01', name: 'Glory Simon', email: 'glory@glorysimoninteriors.com', role: 'Studio Director', status: 'Active' },
    { id: 'USR-02', name: 'Elena Vance', email: 'elena@glorysimoninteriors.com', role: 'Senior Designer', status: 'Active' },
    { id: 'USR-03', name: 'Dorian Gray', email: 'dorian@glorysimoninteriors.com', role: 'Project Manager', status: 'Active' },
    { id: 'USR-04', name: 'Gordon Freeman', email: 'gordon@glorysimoninteriors.com', role: 'Vendor Coordinator', status: 'Active' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Senior Designer');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = {
      id: `USR-0${users.length + 1}`,
      name,
      email,
      role,
      status: 'Active'
    };

    setUsers([...users, newUser]);
    setShowAddForm(false);
    // Reset
    setName('');
    setEmail('');
    setRole('Senior Designer');
  };

  const handleChangeRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert(`Access role modified successfully!`);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Team & Permissions</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Configure user access credentials, assign system profiles, and add new workspace members.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'Invite User'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        {/* Table directory */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Team Directory</h3>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Workspace Member</th>
                  <th>Access Role</th>
                  <th>Permission Level</th>
                  <th>System Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{u.id}</td>
                    <td>
                      <div>
                        <p style={{ fontWeight: '500' }}>{u.name}</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</p>
                      </div>
                    </td>
                    <td>
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                        className="form-control"
                        style={{
                          fontSize: '13px',
                          padding: '4px 8px',
                          width: 'auto',
                          backgroundColor: 'var(--bg-app)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)'
                        }}
                      >
                        <option value="Studio Director">Studio Director</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Senior Designer">Senior Designer</option>
                        <option value="Vendor Coordinator">Vendor Coordinator</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '13px' }}>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>
                        {u.role === 'Studio Director' ? 'Full Control' : u.role === 'Project Manager' ? 'Project Operations' : u.role === 'Senior Designer' ? 'Design Board Only' : 'Inventory & Vendor Only'}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">{u.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite User form */}
        {showAddForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Invite Workspace User</h3>

            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="e.g. Alyx Vance" />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="alyx@glorysimoninteriors.com" />
              </div>

              <div className="form-group">
                <label className="form-label">Role Profile</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Studio Director">Studio Director / Owner</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Senior Designer">Senior Designer</option>
                  <option value="Vendor Coordinator">Vendor Coordinator</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Invite Member
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
