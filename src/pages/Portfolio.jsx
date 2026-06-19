import React, { useState } from 'react';
import { Sparkles, MessageSquareQuote, Check } from 'lucide-react';
import BeforeAfter from '../components/BeforeAfter';
import { initialPortfolioItems } from '../dummyData';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const items = initialPortfolioItems;

  const categories = ['All', 'Living Room', 'Kitchen', 'Office'];

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Design Portfolio</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Examine completed projects, before/after transformations, and verified customer testimonials.</p>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '6px 16px', fontSize: '13px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcase Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Interactive Slider */}
            <BeforeAfter
              beforeImage={item.beforeImg}
              afterImage={item.afterImg}
              title={item.title}
            />

            {/* Info details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-info">{item.category}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Client: <strong>{item.client}</strong></span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-main)' }}>
                {item.description}
              </p>
            </div>

            {/* Testimonial Quote */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
                marginTop: '4px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <MessageSquareQuote size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <p style={{ fontSize: '12.5px', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {item.testimonial}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
