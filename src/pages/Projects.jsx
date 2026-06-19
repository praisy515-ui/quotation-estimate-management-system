import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Briefcase, Calendar, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { initialProjects } from '../dummyData';

export default function Projects() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [customer, setCustomer] = useState('Sophia Loren');
  const [type, setType] = useState('Residential');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Planning');

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowAddForm(true);
    }
  }, [searchParams]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!name) return;

    const newPrj = {
      id: `PRJ-50${projects.length + 1}`,
      name,
      customer,
      type,
      progress: status === 'Completed' ? 100 : status === 'Planning' ? 0 : 25,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '2026-12-31',
      status
    };

    setProjects([newPrj, ...projects]);
    setShowAddForm(false);
    // Reset
    setName('');
    setStartDate('');
    setEndDate('');
    setStatus('Planning');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
      case 'In Progress': return <Clock size={16} style={{ color: 'var(--accent-gold)' }} />;
      case 'Planning': return <AlertCircle size={16} style={{ color: 'var(--warning)' }} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'var(--success)';
      case 'In Progress': return 'var(--accent-gold)';
      case 'Planning': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  // Timeline Steps based on progress
  const getTimelineSteps = (progress) => {
    return [
      { label: 'Design Board Approved', done: progress >= 15 },
      { label: 'Site Rough-In', done: progress >= 40 },
      { label: 'Materials Procured', done: progress >= 65 },
      { label: 'Carpentry & Styling', done: progress >= 85 },
      { label: 'Client Handover', done: progress === 100 },
    ];
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>Projects Directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Monitor execution progress, milestone timelines, and completion metrics.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <Plus size={16} />
          <span>Launch Project</span>
        </button>
      </div>

      {/* Main Grid: Projects List + Details Drawer */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Projects Cards Grid */}
        <div style={{ flex: 2, minWidth: '320px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover"
              onClick={() => setSelectedProject(project)}
              style={{
                cursor: 'pointer',
                borderLeft: `4px solid ${getStatusColor(project.status)}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: selectedProject?.id === project.id ? 'rgba(197, 168, 128, 0.06)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{project.id}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '600', color: getStatusColor(project.status) }}>
                  {getStatusIcon(project.status)}
                  <span>{project.status}</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{project.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Client: <strong style={{ color: 'var(--accent-gold)' }}>{project.customer}</strong></p>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Execution Stage</span>
                  <span style={{ fontWeight: '600' }}>{project.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255, 255, 255, 0.05)', overflow: 'hidden' }}>
                  <div style={{ width: `${project.progress}%`, height: '100%', borderRadius: '3px', backgroundColor: getStatusColor(project.status) }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <span>Start: {project.startDate}</span>
                <span>End: {project.endDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Project Timeline Drawer */}
        {selectedProject && (
          <div className="glass-panel fade-in" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--accent-gold)' }}>Project Milestones</h3>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedProject.id} • {selectedProject.type}</span>
                <h4 style={{ fontSize: '18px', fontFamily: 'var(--font-sans)', fontWeight: '700', marginTop: '4px' }}>{selectedProject.name}</h4>
              </div>

              {/* Timeline Tracker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                {getTimelineSteps(selectedProject.progress).map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: step.done ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                          border: step.done ? 'none' : '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2
                        }}
                      >
                        {step.done && <CheckCircle size={12} style={{ color: '#121418' }} />}
                      </div>
                      {idx < 4 && (
                        <div
                          style={{
                            width: '2px',
                            height: '30px',
                            backgroundColor: step.done ? 'var(--accent-gold)' : 'var(--border-color)',
                            marginTop: '4px',
                            marginBottom: '4px',
                            zIndex: 1
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: step.done ? '600' : '400', color: step.done ? 'var(--text-main)' : 'var(--text-muted)' }}>
                        {step.label}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {step.done ? 'Milestone Complete' : 'Awaiting phase arrival'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Project Form Modal */}
      {showAddForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          className="fade-in"
        >
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', position: 'relative' }}>
            <button
              onClick={() => setShowAddForm(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '20px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Launch New Project</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Deploy a newly approved design contract into active production execution.</p>

            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="e.g. Wayne Penthouse Renovation" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Associated Client</label>
                  <select value={customer} onChange={(e) => setCustomer(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="Sophia Loren">Sophia Loren</option>
                    <option value="Elon Musk">Elon Musk</option>
                    <option value="Marcus Aurelius">Marcus Aurelius</option>
                    <option value="Emma Watson">Emma Watson</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Design Category</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Contract Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Handover Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Stage</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <option value="Planning">Planning (0% done)</option>
                  <option value="In Progress">In Progress (25% done)</option>
                  <option value="Completed">Completed (100% done)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Deploy Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
