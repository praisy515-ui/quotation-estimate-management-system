import React, { useState } from 'react';
import { Layers, Plus, Search, HelpCircle, PackageOpen } from 'lucide-react';
import { initialMaterials } from '../dummyData';

export default function Materials() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Flooring');
  const [quality, setQuality] = useState('Premium');
  const [unitPrice, setUnitPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('In Stock');

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || m.category.includes(categoryFilter) || (categoryFilter === 'Flooring' && m.category.includes('Flooring'));
    return matchesSearch && matchesCat;
  });

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!name || !unitPrice) return;

    const newMat = {
      id: `MAT-60${materials.length + 1}`,
      name,
      category,
      quality,
      unitPrice: `$${unitPrice}`,
      stockStatus
    };

    setMaterials([newMat, ...materials]);
    setShowAddForm(false);
    // Reset
    setName('');
    setUnitPrice('');
    setStockStatus('In Stock');
  };

  const getStockBadgeClass = (status) => {
    if (status === 'In Stock') return 'badge-success';
    if (status === 'Low Stock') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Materials Directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Track material pricing, vendor catalog specifications, and quality classifications.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'Register Material'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        {/* Table & Filtering */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search materials catalog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '40px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Flooring', 'Hardware', 'Fabrics', 'Finishes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Material Name</th>
                  <th>Category</th>
                  <th>Quality Grade</th>
                  <th>Unit Price</th>
                  <th>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{m.id}</td>
                    <td style={{ fontWeight: '500' }}>{m.name}</td>
                    <td>{m.category}</td>
                    <td>
                      <span className={`badge ${m.quality === 'Luxury' ? 'badge-info' : m.quality === 'Premium' ? 'badge-warning' : 'badge-success'}`}>
                        {m.quality}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{m.unitPrice}</td>
                    <td>
                      <span className={`badge ${getStockBadgeClass(m.stockStatus)}`}>
                        {m.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Material Form */}
        {showAddForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Log New Material</h3>
            
            <form onSubmit={handleAddMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Material Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="e.g. Arabescato Orobico Marble" />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Flooring">Flooring / Countertops</option>
                  <option value="Hardware">Hardware / Trims</option>
                  <option value="Fabrics">Fabrics / Curtains</option>
                  <option value="Finishes">Finishes / Paint</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quality Grade</label>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Standard">Standard (Budget-Friendly)</option>
                  <option value="Premium">Premium (High End)</option>
                  <option value="Luxury">Luxury (Ultra Premium / Imports)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Price Description</label>
                  <input type="text" required value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="form-control" placeholder="e.g. 45 / Sq.ft" />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock Status</label>
                  <select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Register Material
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
