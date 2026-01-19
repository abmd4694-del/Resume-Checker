import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, Briefcase, LogOut, PieChart } from 'lucide-react';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 style={{ padding: '0 1rem 2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>JobTracker</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{justifyContent: 'flex-start', background: 'transparent'}}>
            <LayoutDashboard size={20} style={{ marginRight: '10px' }} /> Dashboard
          </NavLink>
          <NavLink to="/jobs" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{justifyContent: 'flex-start', background: 'transparent'}}>
            <Briefcase size={20} style={{ marginRight: '10px' }} /> Applications
          </NavLink>
          <NavLink to="/resume" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{justifyContent: 'flex-start', background: 'transparent'}}>
             <FileText size={20} style={{ marginRight: '10px' }} /> Resume Analysis
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`} style={{justifyContent: 'flex-start', background: 'transparent'}}>
             <PieChart size={20} style={{ marginRight: '10px' }} /> Analytics
          </NavLink>
        </nav>
        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444' }}>
            <LogOut size={20} style={{ marginRight: '10px' }} /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
