import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function StudentDashboardPreview() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
            Verified Student Session (MongoDB Persisted)
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--ink)' }}>
            Welcome back, {user?.name}
          </h1>
          <p style={{ color: 'var(--ink-soft)' }}>
            Roll Number: <strong>{user?.profile?.rollNumber || 'N/A'}</strong> &bull; {user?.profile?.department || 'General'} (Sem {user?.profile?.semester || 1})
          </p>
        </div>
        <div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Current Semester GPA</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--ink)' }}>
            {user?.profile?.currentGpa ? user.profile.currentGpa.toFixed(2) : '3.82'}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--green)' }}>Dean's Honor List Standby</span>
        </div>

        <div className="card">
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Attendance Rate</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--ink)' }}>
            {user?.profile?.attendancePercentage ? `${user.profile.attendancePercentage}%` : '88.5%'}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--green)' }}>Threshold Compliant (&gt;75%)</span>
        </div>

        <div className="card">
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Active Enrolled Courses</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--ink)' }}>6</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>24 Credit Hours</span>
        </div>

        <div className="card">
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Pending Assignments</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--ink)' }}>3</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--gold-ink)' }}>Next due in 2 days</span>
        </div>
      </div>

      <div className="card" style={{ background: '#FFFFFF', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Full-Stack Transition Status (Phase 4 Verified)</h3>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Your user profile and session are now completely powered by <strong>Express + MongoDB</strong> with HttpOnly JWT cookies. In <strong>Phase 5</strong>, each of the remaining 16 student sub-modules (Tasks, Goals, Study Timer, Notes, Calendar, Analytics) will be wired to real database collections.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/student/tasks.html" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            Preview Tasks UI ↗
          </a>
          <a href="/student/notes.html" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            Preview Notes UI ↗
          </a>
          <a href="/student/study.html" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            Preview Study Timer ↗
          </a>
        </div>
      </div>
    </div>
  );
}
