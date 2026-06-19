import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  HelpCircle,
  Calendar,
  Calculator,
  Briefcase,
  Image,
  Layers,
  Truck,
  CreditCard,
  ClipboardCheck,
  BarChart3,
  Bot,
  Bell,
  LifeBuoy,
  UserCheck,
  X,
  Compass
} from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Enquiries', path: '/enquiries', icon: HelpCircle },
    { name: 'Site Visits', path: '/site-visits', icon: Calendar },
    { name: 'Quotations', path: '/quotations', icon: Calculator },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Portfolio', path: '/portfolio', icon: Image },
    { name: 'Materials', path: '/materials', icon: Layers },
    { name: 'Vendors', path: '/vendors', icon: Truck },
    { name: 'Payments', path: '/payments', icon: CreditCard },
    { name: 'Approvals', path: '/approvals', icon: ClipboardCheck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Users', path: '/users', icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
          }}
          className="no-print"
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-sidebar)',
          color: '#ffffff',
          zIndex: 101,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
        }}
        className={`sidebar no-print ${isOpen ? 'open' : ''}`}
      >
        {/* Sidebar Header */}
        <div
          style={{
            height: 'var(--navbar-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={24} style={{ color: 'var(--accent-gold)' }} />
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '16px',
                  margin: 0,
                  letterSpacing: '1px',
                  color: 'var(--accent-gold)',
                  fontWeight: '700',
                  lineHeight: '1.2'
                }}
              >
                GLORY SIMON
              </h1>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Interiors QAEMS
              </p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'none', // Shown in CSS media queries or handled below
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth <= 1024) {
                    toggleSidebar();
                  }
                }}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#121418' : 'rgba(255,255,255,0.7)',
                  backgroundColor: isActive ? 'var(--accent-gold)' : 'transparent',
                  transition: 'all 0.2s ease',
                })}
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#121418',
              }}
            >
              GS
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600' }}>Glory Simon</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Director</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#e63946',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              textAlign: 'center',
              width: '100%',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(230,57,70,0.1)')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.05)')}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Media query helper styles inside React style tag */}
      <style>{`
        @media (min-width: 1025px) {
          .sidebar {
            transform: translateX(0) !important;
          }
          .mobile-close-btn {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
