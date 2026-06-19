import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layout components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Page components
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Enquiries from './pages/Enquiries';
import SiteVisits from './pages/SiteVisits';
import Quotations from './pages/Quotations';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Materials from './pages/Materials';
import Vendors from './pages/Vendors';
import Payments from './pages/Payments';
import Approvals from './pages/Approvals';
import Reports from './pages/Reports';
import AIAssistant from './pages/AIAssistant';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import Users from './pages/Users';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('qaems-auth') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('qaems-role') || 'admin'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = ({ email, role, rememberMe }) => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (rememberMe) {
      localStorage.setItem('qaems-auth', 'true');
      localStorage.setItem('qaems-role', role);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('qaems-auth');
    localStorage.removeItem('qaems-role');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Private Layout Wrapper
  function AuthenticatedLayout() {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="app-container">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar
            toggleSidebar={toggleSidebar}
            role={userRole}
            onLogout={handleLogout}
          />
          
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Private Dashboard Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/site-visits" element={<SiteVisits />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<Support />} />
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
