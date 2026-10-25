import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ApiHealthCheck } from './components/ApiHealthCheck';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="health"
          element={
            <div className="container" style={{ padding: '3rem 1rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>System Diagnostics</h1>
                <p style={{ color: 'var(--ink-soft)' }}>Real-time connectivity check between React client and Express API.</p>
              </div>
              <ApiHealthCheck />
            </div>
          }
        />
        <Route
          path="login"
          element={
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Phase 4 Transition</span>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Authentication Portal</h1>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '520px', margin: '0 auto 2rem' }}>
                Full-stack JWT and MongoDB user sessions will be activated in <strong>Phase 4</strong>. In the interim, explore the static auth pages via the link below.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href="/auth/login.html" className="btn btn-secondary">
                  Open Static Auth Page ↗
                </a>
                <a href="/" className="btn btn-primary">
                  Back to Hub
                </a>
              </div>
            </div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
