
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const ProtectedAdminRoute: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();

  // If not authenticated, redirect to admin login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedAdminRoute;
