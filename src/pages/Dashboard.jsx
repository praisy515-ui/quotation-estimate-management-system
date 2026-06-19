import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users as UsersIcon,
  Calculator,
  Briefcase,
  DollarSign,
  Calendar,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import {
  initialCustomers,
  initialQuotations,
  initialProjects,
  initialPayments,
  initialSiteVisits,
  initialActivities
} from '../dummyData';

export default function Dashboard() {
  const navigate = useNavigate();

  // Metrics Calculations
  const totalCustomers = initialCustomers.length;
  const totalQuotations = initialQuotations.length;
  const activeProjectsCount = initialProjects.filter(p => p.status === 'In Progress').length;
  const pendingPaymentsCount = initialPayments.filter(p => p.status === 'Pending' || p.status === 'Overdue').length;
  const upcomingSiteVisitsCount = initialSiteVisits.filter(v => v.status === 'Scheduled').length;

  // Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 49000 },
    { month: 'Apr', revenue: 75000 },
    { month: 'May', revenue: 98000 },
    { month: 'Jun', revenue: 112000 },
  ];

  const projectStatusData = [
    { name: 'Planning', value: initialProjects.filter(p => p.status === 'Planning').length, color: '#f2a65a' },
    { name: 'In Progress', value: initialProjects.filter(p => p.status === 'In Progress').length, color: '#c5a880' },
    { name: 'Completed', value: initialProjects.filter(p => p.status === 'Completed').length, color: '#52b788' },
  ];

  const statCards = [
    { title: 'Total Customers', value: totalCustomers, icon: UsersIcon, color: '#c5a880', desc: 'Active client accounts' },
    { title: 'Total Quotations', value: totalQuotations, icon: Calculator, color: '#457b9d', desc: 'Estimates generated' },
    { title: 'Active Projects', value: activeProjectsCount, icon: Briefcase, color: '#52b788', desc: 'Projects under execution' },
    { title: 'Pending Payments', value: pendingPaymentsCount, icon: DollarSign, color: '#e63946', desc: 'Awaiting clearance' },
    { title: 'Site Visits Scheduled', value: upcomingSiteVisitsCount, icon: Calendar, color: '#f2a65a', desc: 'Consultations booked' },
  ];

  const quickActions = [
    { name: 'Create Quotation', icon: Plus, path: '/quotations', color: 'var(--accent-gold)' },
    { name: 'Add Customer', icon: Plus, path: '/customers?action=add', color: '#52b788' },
    { name: 'Schedule Site Visit', icon: Plus, path: '/site-visits?action=schedule', color: '#f2a65a' },
    { name: 'Create Project', icon: Plus, path: '/projects?action=create', color: '#457b9d' },
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Studio Overview</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Welcome back, Glory. Here is what is happening at Glory Simon Interiors today.</p>
      </div>

      {/* Quick Actions Panel */}
      <div className="glass-panel" style={{ padding: '16px 24px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className="btn btn-secondary glass-panel-hover"
              style={{
                justifyContent: 'flex-start',
                padding: '12px 16px',
                borderLeft: `4px solid ${action.color}`,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <action.icon size={16} style={{ color: action.color }} />
              <span style={{ fontWeight: '600', fontSize: '13px' }}>{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)' }}>{card.title}</span>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(197, 168, 128, 0.1)', color: card.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>{card.value}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{card.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Revenue Overview */}
        <div className="glass-panel" style={{ height: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>Revenue Overview</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Studio earnings over the past 6 months</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '13px', fontWeight: '600' }}>
              <TrendingUp size={16} />
              <span>+14.2%</span>
            </div>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197, 168, 128, 0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-sidebar)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent-gold)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status */}
        <div className="glass-panel" style={{ height: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>Projects Pipeline</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Overview of current projects by status</p>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectStatusData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197, 168, 128, 0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-sidebar)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <Clock size={18} style={{ color: 'var(--accent-gold)' }} />
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>Recent Activities</h3>
        </div>
        <div className="table-container" style={{ margin: 0 }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Target / Reference</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {initialActivities.map((act) => (
                <tr key={act.id}>
                  <td style={{ fontWeight: '500' }}>{act.user}</td>
                  <td>{act.action}</td>
                  <td>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: '500' }}>{act.target}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{act.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
