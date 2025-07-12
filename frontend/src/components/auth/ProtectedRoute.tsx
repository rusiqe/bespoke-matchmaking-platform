import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
  requireProfileCompletion?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireEmailVerification = false,
  requireProfileCompletion = false 
}) => {
  const location = useLocation();
  const { isAuthenticated, loading, user } = useAppSelector((state) => state.auth);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check email verification requirement
  if (requireEmailVerification && user && !user.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Check profile completion requirement
  // TODO: Implement profile completion check when profile structure is finalized
  // if (requireProfileCompletion && user && !user.isProfileComplete) {
  //   return <Navigate to="/onboarding" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
