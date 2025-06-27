import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { Landing } from './pages/Landing';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Status from './pages/Status';
import Terms from './pages/Terms';
import { Dashboard } from './pages/Dashboard';
import { Repositories } from './pages/Repositories';
import { RepositoryDetail } from './pages/RepositoryDetail';
import { Issues } from './pages/Issues';
import { PullRequests } from './pages/PullRequests';
import { PullRequestDetail } from './pages/PullRequestDetail';
import { Notifications } from './pages/Notifications';
import { Account } from './pages/Account';
import { Settings } from './pages/Settings';
import { Integrations } from './pages/Integrations';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Landing Pages */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="auth" element={<Auth />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="security" element={<Security />} />
            <Route path="status" element={<Status />} />
            <Route path="terms" element={<Terms />} />
          </Route>
          
          {/* Authenticated Routes - Dashboard Area */}
          <Route path="/dashboard" element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="repositories" element={<Repositories />} />
            <Route path="repositories/:org/:repo" element={<RepositoryDetail />} />
            <Route path="issues" element={<Issues />} />
            <Route path="pull-requests" element={<PullRequests />} />
            <Route path="pull-requests/:id" element={<PullRequestDetail />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="integrations" element={<Integrations />} />
          </Route>
          
          {/* Catch all route - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;