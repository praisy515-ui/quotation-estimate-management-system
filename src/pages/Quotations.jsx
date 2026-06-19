import React, { useState } from 'react';
import { Plus, Trash2, Printer, Download, Calculator, Check, Compass, FileText } from 'lucide-react';
import { initialQuotations } from '../dummyData';

export default function Quotations() {
  const [customerName, setCustomerName] = useState('Sophia Loren');
  const [projectType, setProjectType] = useState('Residential');
  const [discountPercent, setDiscountPercent] = useState(5);
  const [taxPercent, setTaxPercent] = useState(18); // GST
  
  // Multi-room state
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Living Room', roomType: 'Living Room', area: 350, quality: 'Premium', furniture: 4500, lighting: 2000, labor: 3500 },
  ]);

  const [estimate, setEstimate] = useState(null);
  const [quotes, setQuotes] = useState(initialQuotations);

  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        id: Date.now(),
        name: `Room ${rooms.length + 1}`,
        roomType: 'Bedroom',
        area: 200,
        quality: 'Standard',
        furniture: 2000,
        lighting: 1000,
        labor: 2000
      }
    ]);
  };

  const removeRoom = (id) => {
    if (rooms.length === 1) return;
    setRooms(rooms.filter(room => room.id !== id));
  };

  const updateRoomField = (id, field, value) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        return { ...room, [field]: value };
      }
      return room;
    }));
  };

  // Pricing engine
  const getQualityMultiplier = (quality) => {
    switch (quality) {
      case 'Standard': return 15;
      case 'Premium': return 35;
      case 'Luxury': return 75;
      default: return 15;
    }
  };

  const calculateEstimate = () => {
    let subtotal = 0;
    const roomDetails = rooms.map(room => {
      const materialPricePerSqFt = getQualityMultiplier(room.quality);
      const materialCost = Number(room.area) * materialPricePerSqFt;
      const roomSubtotal = materialCost + Number(room.furniture) + Number(room.lighting) + Number(room.labor);
      subtotal += roomSubtotal;
      return {
        ...room,
        materialCost,
        roomSubtotal
      };
    });

    const discountAmount = subtotal * (Number(discountPercent) / 100);
    const taxAmount = (subtotal - discountAmount) * (Number(taxPercent) / 100);
    const grandTotal = subtotal - discountAmount + taxAmount;

    setEstimate({
      roomDetails,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('Generating PDF Document... Download started successfully (Mock).');
  };

  const handleSaveQuotation = () => {
    if (!estimate) return;
    const newQuote = {
      id: `QT-40${quotes.length + 1}`,
      customerName,
      projectType,
      date: new Date().toISOString().split('T')[0],
      roomsCount: rooms.length,
      subtotal: estimate.subtotal,
      tax: estimate.taxAmount,
      discount: estimate.discountAmount,
      grandTotal: estimate.grandTotal,
      status: 'Draft'
    };
    setQuotes([newQuote, ...quotes]);
    alert('Quotation saved to studio records successfully!');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Quotation Builder</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Add client scopes, rooms, customize material specifications, and instantly compile invoices.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }} className="no-print">
        
        {/* Left Form: Client details & Rooms list */}
        <div style={{ flex: 2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Client Info */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>1. Client & Project Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control" placeholder="Sophia Loren" />
              </div>
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Residential">Residential Project</option>
                  <option value="Commercial">Commercial Project</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Discount (%)</label>
                <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-label">GST Tax Rate (%)</label>
                <input type="number" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} className="form-control" />
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>2. Room Estimations</h3>
              <button className="btn btn-secondary btn-sm" onClick={addRoom}>
                <Plus size={14} /> Add Room
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  style={{
                    padding: '20px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>Room #{index + 1}</span>
                    {rooms.length > 1 && (
                      <button onClick={() => removeRoom(room.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Room Identifier Name</label>
                      <input type="text" value={room.name} onChange={(e) => updateRoomField(room.id, 'name', e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Room Category</label>
                      <select value={room.roomType} onChange={(e) => updateRoomField(room.id, 'roomType', e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <option value="Living Room">Living Room</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Office">Office Space</option>
                        <option value="Dining Hall">Dining Hall</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Area (Sq.ft)</label>
                      <input type="number" value={room.area} onChange={(e) => updateRoomField(room.id, 'area', e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Material Grade</label>
                      <select value={room.quality} onChange={(e) => updateRoomField(room.id, 'quality', e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <option value="Standard">Standard ($15/sq.ft)</option>
                        <option value="Premium">Premium ($35/sq.ft)</option>
                        <option value="Luxury">Luxury ($75/sq.ft)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', borderTop: '1px dotted var(--border-color)', paddingTop: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Furniture Est. ($)</label>
                      <input type="number" value={room.furniture} onChange={(e) => updateRoomField(room.id, 'furniture', e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Lighting Est. ($)</label>
                      <input type="number" value={room.lighting} onChange={(e) => updateRoomField(room.id, 'lighting', e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Labour Est. ($)</label>
                      <input type="number" value={room.labor} onChange={(e) => updateRoomField(room.id, 'labor', e.target.value)} className="form-control" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={calculateEstimate} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              <Calculator size={16} />
              <span>Calculate Estimate</span>
            </button>
          </div>
        </div>

        {/* Right Form: Estimate Summary Card */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Summary Card */}
          <div className="glass-panel" style={{ backgroundColor: 'rgba(197, 168, 128, 0.05)', border: '2px solid var(--accent-gold)' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              Estimate Summary
            </h3>
            
            {estimate ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Material + Labor Subtotal</span>
                  <span style={{ fontWeight: '600' }}>${estimate.subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--danger)' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${estimate.discountAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--success)' }}>
                  <span>GST ({taxPercent}%)</span>
                  <span>+${estimate.taxAmount.toLocaleString()}</span>
                </div>
                
                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Grand Total</span>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                    ${Math.round(estimate.grandTotal).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  <button className="btn btn-primary" onClick={handleSaveQuotation}>
                    <Check size={16} /> Save Quotation
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={handlePrint}>
                      <Printer size={14} /> Print
                    </button>
                    <button className="btn btn-secondary" onClick={handleDownloadPDF}>
                      <Download size={14} /> PDF
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <Calculator size={36} style={{ color: 'var(--accent-gold)', marginBottom: '12px', opacity: 0.7 }} />
                <p>Click "Calculate Estimate" to generate billing calculations.</p>
              </div>
            )}
          </div>

          {/* Past Quotes List */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '14px', color: 'var(--accent-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Estimates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quotes.map((q) => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>{q.customerName}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{q.id} • {q.roomsCount} rooms</p>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-gold)' }}>${q.grandTotal.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Professional Quotation Preview Section (Appears after calculation, formats beautifully for printing) */}
      {estimate && (
        <div className="glass-panel print-area fade-in" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Compass size={28} style={{ color: 'var(--accent-gold)' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--accent-gold)', margin: 0, letterSpacing: '1.5px' }}>
                  GLORY SIMON INTERIORS
                </h2>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Luxury Architectural Space Design</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>studio@glorysimoninteriors.com • www.glorysimoninteriors.com</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--accent-gold)', margin: 0 }}>ESTIMATE</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Date: {new Date().toISOString().split('T')[0]}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ref: QT-MOCK-2026</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '8px', letterSpacing: '1px' }}>Prepared For:</h4>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>{customerName}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Project Category: {projectType}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '8px', letterSpacing: '1px' }}>Issued By:</h4>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>Glory Simon Interiors Studio</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Interior Design Lead: Glory Simon</p>
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--accent-gold)' }}>
                  <th>Room Name / Scope</th>
                  <th>Area (Sq.ft)</th>
                  <th>Quality Grade</th>
                  <th style={{ textAlign: 'right' }}>Furniture</th>
                  <th style={{ textAlign: 'right' }}>Lighting</th>
                  <th style={{ textAlign: 'right' }}>Labor</th>
                  <th style={{ textAlign: 'right' }}>Room Total</th>
                </tr>
              </thead>
              <tbody>
                {estimate.roomDetails.map((room) => (
                  <tr key={room.id}>
                    <td style={{ fontWeight: '500' }}>
                      <p>{room.name}</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{room.roomType}</span>
                    </td>
                    <td>{room.area} Sq.ft</td>
                    <td>{room.quality}</td>
                    <td style={{ textAlign: 'right' }}>${Number(room.furniture).toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>${Number(room.lighting).toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>${Number(room.labor).toLocaleString()}</td>
                    <td style={{ textAlign: 'right', fontWeight: '600', color: 'var(--accent-gold)' }}>
                      ${Math.round(room.roomSubtotal).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Net Room Cost Subtotal:</span>
                <span>${estimate.subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--danger)' }}>
                <span>Studio Discount ({discountPercent}%):</span>
                <span>-${estimate.discountAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--success)' }}>
                <span>Integrated GST Tax ({taxPercent}%):</span>
                <span>+${estimate.taxAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--accent-gold)', paddingTop: '12px', marginTop: '4px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>Grand Invoice Total:</span>
                <span style={{ fontWeight: '800', fontSize: '20px', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  ${Math.round(estimate.grandTotal).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
            <p>This estimate is valid for 30 days from the date of issue. Term of payment: 50% advance, 40% on material delivery, 10% on completion.</p>
            <p style={{ marginTop: '4px' }}>Thank you for choosing Glory Simon Interiors. We look forward to designing your dream spaces.</p>
          </div>
        </div>
      )}

      {/* print styling media query for print preview */}
      <style>{`
        @media print {
          .print-area {
            border: none !important;
            box-shadow: none !important;
            background: #fff !important;
            color: #000 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-area * {
            color: #000 !important;
            border-color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
}
