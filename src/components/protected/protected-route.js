import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
