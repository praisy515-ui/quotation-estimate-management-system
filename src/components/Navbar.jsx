import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Sun, Moon, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { initialNotifications } from '../dummyData';

export default function Navbar({ toggleSidebar, role, onLogout }) {
  const [theme, setTheme] = useState(localStorage.getItem('qaems-theme') || 'light');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qaems-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: 'var(--navbar-height)',
        backgroundColor: 'var(--bg-navbar)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 99,
      }}
      className="no-print"
    >
      {/* Left section: Hamburger & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
          className="hamburger-btn"
        >
          <Menu size={22} />
        </button>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '1px',
            color: 'var(--accent-gold)',
          }}
          className="nav-breadcrumb"
        >
          Glory Simon Interiors
        </span>
      </div>

      {/* Middle section: Search Bar */}
      <div
        style={{
          position: 'relative',
          maxWidth: '400px',
          width: '100%',
        }}
        className="nav-search-container"
      >
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search customers, quotes, materials..."
          style={{
            width: '100%',
            padding: '8px 16px 8px 40px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-main)',
            fontSize: '13px',
            outline: 'none',
          }}
        />
      </div>

      {/* Right section: Actions (Theme, Notifications, Profile) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(197, 168, 128, 0.1)',
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications Dropdown Container */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(197, 168, 128, 0.1)',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: 'var(--danger)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                width: '320px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 1000,
                boxShadow: 'var(--shadow-lg)',
                animation: 'fadeIn 0.2s ease forwards',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--accent-gold)' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '11px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      backgroundColor: n.read ? 'transparent' : 'rgba(197, 168, 128, 0.08)',
                      borderLeft: n.read ? 'none' : '3px solid var(--accent-gold)',
                      fontSize: '12px',
                    }}
                  >
                    <p style={{ color: 'var(--text-main)', marginBottom: '4px' }}>{n.text}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Container */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '20px',
              backgroundColor: 'rgba(197, 168, 128, 0.1)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#121418',
              }}
            >
              <User size={16} />
            </div>
            <div style={{ textAlign: 'left', display: 'none' }} className="nav-profile-name">
              <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '1.2' }}>Simon G.</p>
              <p style={{ fontSize: '9px', color: 'var(--accent-gold)', textTransform: 'capitalize' }}>{role}</p>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </div>

          {showProfileMenu && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '45px',
                right: 0,
                width: '180px',
                padding: '8px',
                zIndex: 1000,
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                animation: 'fadeIn 0.2s ease forwards',
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Glory Simon</p>
                <p style={{ fontSize: '10px', color: 'var(--accent-gold)', textTransform: 'capitalize' }}>{role}</p>
              </div>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--text-main)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(197,168,128,0.1)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <Settings size={14} />
                <span>Settings</span>
              </button>
              <button
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--danger)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(230,57,70,0.1)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Styles for hamburger display and responsive visibility */}
      <style>{`
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex !important;
          }
          .nav-breadcrumb {
            display: none !important;
          }
          .nav-search-container {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .nav-profile-name {
            display: block !important;
          }
        }
        @media (min-width: 1025px) {
          header {
            left: var(--sidebar-width) !important;
          }
        }
      `}</style>
    </header>
  );
}
