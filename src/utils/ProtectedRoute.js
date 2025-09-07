// frontend/src/utils/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // If there's no token, redirect to the /login page
    return <Navigate to="/login" />;
  }

  // If a token exists, render the component that was passed as children
  return children;
};

export default ProtectedRoute;