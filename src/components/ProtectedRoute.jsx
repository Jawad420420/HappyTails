import { Navigate, useLocation } from 'react-router-dom';

/**
 * Guards a route behind login, and optionally a specific role.
 * - Not logged in -> redirect to /auth (and remember where they were headed)
 * - Logged in but wrong role -> redirect to their own dashboard
 */
export default function ProtectedRoute({ isLoggedIn, userRole, allowedRole, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (allowedRole && userRole !== allowedRole) {
    const fallback = userRole === 'shelter' ? '/shelter-dashboard' : '/user-dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
