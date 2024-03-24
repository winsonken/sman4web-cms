import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../services/features/authSlice';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
