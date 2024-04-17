import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { logOut, selectCurrentToken } from '../services/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import PopUpExpired from './PopUpExpired';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logOut());
  };

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) {
      return true;
    }

    const expirationTime = decodedToken.exp * 1000;

    const currentTime = new Date().getTime();

    return expirationTime < currentTime;
  };

  useEffect(() => {
    const isExpired = isTokenExpired(token);

    if (isExpired) {
      setShowLogoutModal(true);
    } else {
      setShowLogoutModal(false);
    }
  }, [dispatch]);

  return token ? (
    <>
      <Outlet />
      {showLogoutModal && <PopUpExpired onClick={handleLogout} />}
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
