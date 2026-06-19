import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, MapPin, Plus, CalendarRange, List, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { initialSiteVisits } from '../dummyData';
import { supabase } from '../supabaseClient';

export default function SiteVisits() {
  const [searchParams] = useSearchParams();
  const [visits, setVisits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [assignedDesigner, setAssignedDesigner] = useState('Elena Vance');
  const [status, setStatus] = useState('Scheduled');

  useEffect(() => {
    fetchSiteVisits();
    if (searchParams.get('action') === 'schedule') {
      setShowForm(true);
    }
  }, [searchParams]);

  const fetchSiteVisits = async () => {
    if (!supabase) {
      setVisits(initialSiteVisits);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_visits')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setVisits(data || []);
    } catch (err) {
      console.warn("Failed fetching from Supabase, loading fallback dummy data: ", err.message);
      setVisits(initialSiteVisits);
    }
  };

  const handleScheduleVisit = async (e) => {
    e.preventDefault();
    if (!customerName || !scheduledDate || !scheduledTime) return;

    const newVisit = {
      id: `SV-30${visits.length + 1}`,
      customer_name: customerName,
      address: address || 'TBD',
      scheduled_date: scheduledDate,
      scheduled_time: scheduledTime,
      assigned_designer: assignedDesigner,
      status
    };

    if (supabase) {
      try {
        const { error } = await supabase.from('site_visits').insert([newVisit]);
        if (error) throw error;
      } catch (err) {
        console.error("Failed saving visit to Supabase: ", err.message);
      }
    }

    const displayVisit = {
      id: newVisit.id,
      customerName: newVisit.customer_name,
      address: newVisit.address,
      scheduledDate: newVisit.scheduled_date,
      scheduledTime: newVisit.scheduled_time,
      assignedDesigner: newVisit.assigned_designer,
      status: newVisit.status
    };

    setVisits([...visits, displayVisit]);
    setShowForm(false);

    // Reset
    setCustomerName('');
    setAddress('');
    setScheduledDate('');
    setScheduledTime('');
    setAssignedDesigner('Elena Vance');
    setStatus('Scheduled');
  };

  const getStatusBadgeClass = (status) => {
    return status === 'Completed' ? 'badge-success' : 'badge-warning';
  };

  // Calendar rendering configurations (June 2026)
  const daysInMonth = 30;
  const startOffset = 0;
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDayClick = (dayNum) => {
    if (!dayNum) return;
    const formattedDate = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    setScheduledDate(formattedDate);
    setScheduledTime('10:00 AM');
    setShowForm(true);
  };

  // Helper to resolve Supabase underscores vs dummy camelCase
  const getDisplayName = (v) => v.customerName || v.customer_name;
  const getDisplayDate = (v) => v.scheduledDate || v.scheduled_date;
  const getDisplayTime = (v) => v.scheduledTime || v.scheduled_time;
  const getDisplayDesigner = (v) => v.assignedDesigner || v.assigned_designer;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Site Visits</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Schedule, assign, and track physical site surveys and client home consultations.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('list')}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: 0,
                backgroundColor: viewMode === 'list' ? 'var(--accent-gold)' : 'transparent',
                color: viewMode === 'list' ? '#121418' : 'var(--text-main)',
                border: 'none',
                fontWeight: viewMode === 'list' ? '600' : '400'
              }}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: 0,
                backgroundColor: viewMode === 'calendar' ? 'var(--accent-gold)' : 'transparent',
                color: viewMode === 'calendar' ? '#121418' : 'var(--text-main)',
                border: 'none',
                fontWeight: viewMode === 'calendar' ? '600' : '400'
              }}
            >
              <CalendarRange size={14} />
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <CalendarIcon size={16} />
            <span>{showForm ? 'Hide Form' : 'Schedule Site Visit'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap-reverse' }}>
        {/* Main Panel */}
        <div className="glass-panel" style={{ flex: 2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {viewMode === 'list' ? (
            <>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>Consultation & Survey Tracking</h3>
              <div className="table-container" style={{ margin: 0 }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Date & Time</th>
                      <th>Assigned Designer</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((visit) => (
                      <tr key={visit.id}>
                        <td style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>{visit.id}</td>
                        <td style={{ fontWeight: '500' }}>{getDisplayName(visit)}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
                            <span style={{ fontSize: '13px' }}>{visit.address}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p style={{ fontWeight: '500' }}>{getDisplayDate(visit)}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{getDisplayTime(visit)}</p>
                          </div>
                        </td>
                        <td>{getDisplayDesigner(visit)}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(visit.status)}`}>
                            {visit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>June 2026</h3>
                <div style={{ display: 'flex', gap: '6px', color: 'var(--text-muted)' }}>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', minWidth: 0 }} disabled><ChevronLeft size={14} /></button>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', minWidth: 0 }} disabled><ChevronRight size={14} /></button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: 'var(--accent-gold)' }}>
                  {weekdays.map(d => <div key={d} style={{ padding: '8px 0' }}>{d}</div>)}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {Array.from({ length: 35 }).map((_, idx) => {
                    const dayNum = idx + 1 - startOffset;
                    const isValidDay = dayNum > 0 && dayNum <= daysInMonth;
                    const dateStr = isValidDay ? `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}` : null;
                    const dayVisits = visits.filter(v => getDisplayDate(v) === dateStr);

                    return (
                      <div
                        key={idx}
                        onClick={() => isValidDay && handleDayClick(dayNum)}
                        style={{
                          height: '90px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '6px',
                          backgroundColor: isValidDay ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.1)',
                          cursor: isValidDay ? 'pointer' : 'default',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          position: 'relative'
                        }}
                        onMouseOver={(e) => isValidDay && (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                        onMouseOut={(e) => isValidDay && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                      >
                        {isValidDay && (
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>
                            {dayNum}
                          </span>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto', flex: 1 }}>
                          {dayVisits.map(v => (
                            <div
                              key={v.id}
                              style={{
                                fontSize: '9px',
                                padding: '2px 4px',
                                borderRadius: '4px',
                                backgroundColor: v.status === 'Completed' ? 'rgba(82, 183, 136, 0.15)' : 'rgba(197, 168, 128, 0.15)',
                                color: v.status === 'Completed' ? 'var(--success)' : 'var(--accent-gold)',
                                border: `1px solid ${v.status === 'Completed' ? 'var(--success)' : 'var(--accent-gold)'}`,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                              title={`${getDisplayName(v)} - ${getDisplayTime(v)}`}
                            >
                              {getDisplayName(v)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Scheduling Form */}
        {showForm && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)' }}>Schedule Consultation</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleScheduleVisit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control" style={{ paddingLeft: '34px' }} placeholder="Sophia Loren" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Site Address</label>
                <textarea required value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2" placeholder="Where is the design site located?" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" required value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input type="text" required value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="form-control" placeholder="10:00 AM" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Designer</label>
                <select value={assignedDesigner} onChange={(e) => setAssignedDesigner(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Elena Vance">Elena Vance (Senior Designer)</option>
                  <option value="Dorian Gray">Dorian Gray (Senior Designer)</option>
                  <option value="Marcus Aurelius (Lead)">Marcus Aurelius (Lead Designer)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Book Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
