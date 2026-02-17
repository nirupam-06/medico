import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, role } = useContext(AuthContext);

  if (!isLoggedIn || (adminOnly && role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      {children}
    </div>
  );
};

export default ProtectedRoute;