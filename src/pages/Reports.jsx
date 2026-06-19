import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, FileSpreadsheet, FileDown, TrendingUp, Sparkles } from 'lucide-react';
import { initialProjects, initialMaterials } from '../dummyData';

export default function Reports() {
  const [reportType, setReportType] = useState('All');

  const revenueData = [
    { name: 'Jan', revenue: 45000, cost: 30000 },
    { name: 'Feb', revenue: 52000, cost: 35000 },
    { name: 'Mar', revenue: 49000, cost: 31000 },
    { name: 'Apr', revenue: 75000, cost: 48000 },
    { name: 'May', revenue: 98000, cost: 60000 },
    { name: 'Jun', revenue: 112000, cost: 68000 },
  ];

  const quotationStatusData = [
    { name: 'Approved', value: 8, color: '#52b788' },
    { name: 'Sent to Client', value: 5, color: '#457b9d' },
    { name: 'Drafts', value: 4, color: '#f2a65a' },
  ];

  const projectProgressData = initialProjects.map(p => ({
    name: p.name.split(' - ')[0],
    progress: p.progress
  }));

  const materialStockData = initialMaterials.map(m => {
    let index = 100;
    if (m.stockStatus === 'Low Stock') index = 25;
    if (m.stockStatus === 'Out of Stock') index = 0;
    return {
      name: m.name.split(' ').slice(0, 2).join(' '),
      stock: index
    };
  });

  const handleExport = (format) => {
    alert(`Compiling database records... Exporting data as ${format} (Mock).`);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Studio Analytics</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Analyze monthly revenue trends, material stock indexes, and quotation pipelines.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => handleExport('Excel')}>
            <FileSpreadsheet size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={() => handleExport('PDF')}>
            <FileDown size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Switcher Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['All', 'Financials', 'Quotations', 'Projects', 'Inventory'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab)}
            className={`btn btn-sm ${reportType === tab ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '20px' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Financial Revenue */}
        {(reportType === 'All' || reportType === 'Financials') && (
          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)' }}>Monthly Revenue vs Cost</h3>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(197, 168, 128, 0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="var(--accent-gold)" radius={[4, 4, 0, 0]} name="Gross Revenue" />
                  <Bar dataKey="cost" fill="#457b9d" radius={[4, 4, 0, 0]} name="Execution Cost" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Quotation Status Pie */}
        {(reportType === 'All' || reportType === 'Quotations') && (
          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)' }}>Quotation Status Ratio</h3>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={quotationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {quotationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '20px' }}>
                {quotationStatusData.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
                    <span style={{ fontWeight: '500' }}>{item.name}: {item.value} quotes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Progress */}
        {(reportType === 'All' || reportType === 'Projects') && (
          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)' }}>Project Completion levels (%)</h3>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectProgressData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(197, 168, 128, 0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', color: '#fff', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="progress" stroke="var(--accent-gold)" strokeWidth={3} dot={{ fill: 'var(--accent-gold)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Material Stock */}
        {(reportType === 'All' || reportType === 'Inventory') && (
          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)' }}>Material Inventory Stock Index</h3>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={materialStockData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(197, 168, 128, 0.05)" />
                  <XAxis type="number" stroke="var(--text-muted)" fontSize={11} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={9} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-sidebar)', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="stock" fill="#52b788" radius={[0, 4, 4, 0]} name="Stock level %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
