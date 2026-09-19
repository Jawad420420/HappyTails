import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Guards a route behind login, and optionally specific role(s).
 * - Not logged in -> redirect to /auth
 * - Logged in but wrong role -> redirect to appropriate dashboard
 */
export default function ProtectedRoute({ isLoggedIn, userRole, allowedRole, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (allowedRole) {
    const isAllowed = Array.isArray(allowedRole)
      ? allowedRole.includes(userRole)
      : userRole === allowedRole;

    if (!isAllowed) {
      const fallback = userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard';
      return <Navigate to={fallback} replace />;
    }
  }

  return children;
}
