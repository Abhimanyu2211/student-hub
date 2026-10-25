import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboardPreview } from './pages/StudentDashboardPreview';
import { AdminDashboardPreview } from './pages/AdminDashboardPreview';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ApiHealthCheck } from './components/ApiHealthCheck';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="health"
            element={
              <div className="container" style={{ padding: '3rem 1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>System Diagnostics</h1>
                  <p style={{ color: 'var(--ink-soft)' }}>Real-time connectivity between React client, Express API, and MongoDB.</p>
                </div>
                <ApiHealthCheck />
              </div>
            }
          />

          {/* Protected Student Routes */}
          <Route
            path="student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboardPreview />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboardPreview />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
