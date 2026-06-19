import React, { useState } from 'react';
import { Bell, Check, Trash2, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { initialNotifications } from '../dummyData';

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('All');

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'All'
    ? notifications
    : filter === 'Unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.read);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return <Sparkles size={16} style={{ color: 'var(--success)' }} />;
      case 'danger': return <ShieldAlert size={16} style={{ color: 'var(--danger)' }} />;
      case 'warning': return <ShieldAlert size={16} style={{ color: 'var(--warning)' }} />;
      default: return <Bell size={16} style={{ color: 'var(--info)' }} />;
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Notifications Log</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Review automated system activity alerts, design approvals, and project updates.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button className="btn btn-secondary btn-sm" onClick={handleMarkAllRead}>
            <Check size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Unread', 'Read'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`btn btn-sm ${filter === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '20px' }}
            >
              {t} ({
                t === 'All' ? notifications.length : t === 'Unread' ? notifications.filter(n => !n.read).length : notifications.filter(n => n.read).length
              })
            </button>
          ))}
        </div>

        {/* List of Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: n.read ? 'rgba(255,255,255,0.01)' : 'rgba(197,168,128,0.06)',
                border: '1px solid var(--border-color)',
                borderLeft: n.read ? '1px solid var(--border-color)' : '4px solid var(--accent-gold)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  {getAlertIcon(n.type)}
                </div>
                <div>
                  <p style={{ fontSize: '13.5px', fontWeight: n.read ? '400' : '600', color: 'var(--text-main)' }}>{n.text}</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {!n.read && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer', padding: '4px' }}
                    title="Mark as Read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                  title="Delete Alert"
                  onMouseOver={(e) => e.target.style.color = 'var(--danger)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <Bell size={36} style={{ color: 'var(--accent-gold)', marginBottom: '12px', opacity: 0.5 }} />
              <p>No notifications found in this category.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
