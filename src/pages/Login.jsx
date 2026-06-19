import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Lock, Mail, Users } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@glorysimon.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('admin');
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, role, rememberMe });
      navigate('/dashboard');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121418',
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(197, 168, 128, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(197, 168, 128, 0.08) 0%, transparent 40%)',
        padding: '20px',
      }}
      className="fade-in"
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          border: '1px solid rgba(197, 168, 128, 0.25)',
          backgroundColor: 'rgba(22, 26, 33, 0.85)',
          color: '#ffffff',
          borderRadius: '20px',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 168, 128, 0.1)',
              color: 'var(--accent-gold)',
              marginBottom: '16px',
            }}
          >
            <Compass size={36} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px', letterSpacing: '2px' }}>
            GLORY SIMON
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Interior Design QAEMS
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                style={{
                  paddingLeft: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(197, 168, 128, 0.2)',
                  color: '#ffffff',
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                style={{
                  paddingLeft: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(197, 168, 128, 0.2)',
                  color: '#ffffff',
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Role Access Profile</label>
            <div style={{ position: 'relative' }}>
              <Users size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
                style={{
                  paddingLeft: '40px',
                  backgroundColor: '#1a1d24',
                  border: '1px solid rgba(197, 168, 128, 0.2)',
                  color: '#ffffff',
                  appearance: 'none',
                }}
              >
                <option value="admin">Admin / Studio Director</option>
                <option value="manager">Project Manager</option>
                <option value="designer">Senior Designer</option>
                <option value="coordinator">Vendor Coordinator</option>
              </select>
            </div>
          </div>

          {/* Remember Me & Forgot PW */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--accent-gold)' }}
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              style={{ color: 'var(--accent-gold)', fontWeight: '500' }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = 'var(--accent-gold)'}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              marginTop: '10px',
              backgroundColor: 'var(--accent-gold)',
              color: '#121418',
            }}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
