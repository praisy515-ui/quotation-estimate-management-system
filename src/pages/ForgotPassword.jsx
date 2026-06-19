import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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

        {submitted ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--success)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#ffffff' }}>Check your email</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
              We have sent a password reset link to <strong style={{ color: 'var(--accent-gold)' }}>{email}</strong>. Please follow the instructions to secure your account.
            </p>
            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-gold)',
                fontWeight: '600',
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              <ArrowLeft size={16} /> Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '8px', lineHeight: '1.5' }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@domain.com"
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
              Send Recovery Email
            </button>

            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                fontWeight: '500',
                marginTop: '8px'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--accent-gold)'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
