import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, HelpCircle, FileText, Layers, Coins } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello, I am the Glory Simon Interiors Assistant. I can suggest interior design color palettes, recommend materials, draft cost estimation models, or summarize active projects. How can I help you today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const presets = [
    { label: 'Suggest Color Schemes', icon: Sparkles, query: 'What are the top color schemes for a luxury modern living room?' },
    { label: 'Material Guide', icon: Layers, query: 'Recommend materials for a premium chef kitchen countertop.' },
    { label: 'Cost Saving Tips', icon: Coins, query: 'What are cost saving tips when managing luxury labor rates?' },
    { label: 'Project Summarizer', icon: FileText, query: 'Generate a project progress summary for Sophia Loren Cozy Residence (PRJ-501).' }
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response after delay
    setTimeout(() => {
      let aiText = '';
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('color') || lowerQuery.includes('schemes')) {
        aiText = 'For a modern luxury living room, I highly recommend a Neutral-Rich Palette:\n\n1. Base: Warm Off-White / Charcoal Gray (60%)\n2. Secondary: Soft Taupe & Brushed Brass/Bronze accents (30%)\n3. Highlight: Sage Green or Burnt Ochre in fabrics/velvet cushions (10%).\n\nThis maintains a classic timeless contrast with metallic gold accents representing Glory Simon’s signature branding.';
      } else if (lowerQuery.includes('material') || lowerQuery.includes('countertop') || lowerQuery.includes('kitchen')) {
        aiText = 'For a luxury kitchen countertop, Calacatta Gold Marble is the premier choice. However, if the client desires low-maintenance durability, I recommend Premium Quartzite (e.g. Taj Mahal Quartzite) which offers marble-like veining but is stain-resistant. For budget flooring, Walnut Hardwood (Premium Grade) provides warmth, while Terrazzo Tiles are excellent for wet areas.';
      } else if (lowerQuery.includes('cost') || lowerQuery.includes('saving') || lowerQuery.includes('labor')) {
        aiText = 'Here are cost estimation tips for interior design projects:\n\n1. Material Grading: Swap Luxury marble for Premium Quartzite in less visible rooms (secondary bathrooms).\n2. Standardize Cabinetry: Use modular carcass structures and customize only the shutter facades.\n3. Labor Schedules: Sequence site rough-ins (electrical + plumbing) together to minimize vendor trip charges.\n4. Design Sign-Off: Freeze 3D renderings early to avoid modification costs during active woodworking.';
      } else if (lowerQuery.includes('sophia loren') || lowerQuery.includes('prj-501') || lowerQuery.includes('summarizer') || lowerQuery.includes('summary')) {
        aiText = 'Project Summary Report (PRJ-501):\n\n- Project: Sophia Loren Cozy Residence\n- Phase: In Progress (75% Complete)\n- Milestones Reached: Design board approved, Site electrical/plumbing rough-in completed, Walnut flooring procured.\n- Remaining Items: Carpentry installation (custom wardrobes) & final styling handovers.\n- Target Handover Date: July 15, 2026.';
      } else {
        aiText = `Thank you for asking! For "${query}", here is the Glory Simon recommendation: Make sure to select materials of Premium or Luxury grade, calculate tax at 18% GST, and cross-reference our active Vendors list for Elite Stone or Luxe Lighting imports to secure trade discounts.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: 'Just now'
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--navbar-height) - 48px)', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>AI Design Assistant</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Draft estimation plans, write summaries, and search for creative material recommendations instantly.</p>
      </div>

      {/* Main Panel */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden' }}>
        
        {/* Messages Feed */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 6px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: msg.sender === 'user' ? 'rgba(197, 168, 128, 0.2)' : 'var(--accent-gold)',
                  color: msg.sender === 'user' ? 'var(--accent-gold)' : '#121418',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  backgroundColor: msg.sender === 'user' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.03)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  color: msg.sender === 'user' ? '#121418' : 'var(--text-main)',
                  whiteSpace: 'pre-line',
                  fontSize: '13.5px',
                  lineHeight: '1.5',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {msg.text}
                <p style={{ fontSize: '9px', textAlign: 'right', marginTop: '6px', opacity: 0.6 }}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Queries Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px',
            marginBottom: '16px'
          }}
        >
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset.query)}
              className="btn btn-secondary glass-panel-hover"
              style={{
                fontSize: '11px',
                padding: '8px 12px',
                justifyContent: 'flex-start',
                textAlign: 'left',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.01)'
              }}
            >
              <preset.icon size={12} style={{ color: 'var(--accent-gold)', marginRight: '6px' }} />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <input
            type="text"
            placeholder="Ask AI about design themes, estimating quotes, material codes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control"
            style={{ borderRadius: '24px', padding: '12px 20px' }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              padding: 0,
              flexShrink: 0
            }}
          >
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
