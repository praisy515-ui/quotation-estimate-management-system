import React, { useState, useRef } from 'react';

export default function BeforeAfter({ beforeImage, afterImage, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{ marginBottom: '0.75rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>{title}</h4>
      <div
        ref={containerRef}
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          height: '350px',
          overflow: 'hidden',
          padding: 0,
          borderRadius: '12px',
          cursor: 'ew-resize',
          userSelect: 'none'
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Base) */}
        <img
          src={afterImage}
          alt="After Renovation"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Before Image (Overlay clipped) */}
        <img
          src={beforeImage}
          alt="Before Renovation"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        />

        {/* Slider Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            backgroundColor: 'var(--accent-gold)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {/* Slider Handle Button */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold)',
              border: '2px solid #ffffff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#121418',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            ↔
          </div>
        </div>

        {/* Labels */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fontSize: '11px',
            borderRadius: '4px',
            zIndex: 5,
            pointerEvents: 'none',
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '1px'
          }}
        >
          Before
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fontSize: '11px',
            borderRadius: '4px',
            zIndex: 5,
            pointerEvents: 'none',
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '1px'
          }}
        >
          After
        </div>
      </div>
    </div>
  );
}
