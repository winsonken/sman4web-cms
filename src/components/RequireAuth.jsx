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
    const checkTokenExpiration = () => {
      const isExpired = isTokenExpired(token);
      setShowLogoutModal(isExpired);
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(interval);
  }, [dispatch, token]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logOut());
  };

  const checkIsExpiredPopUp = () => {
    if (showLogoutModal) {
      handleLogout();
    }
  };

  window.addEventListener('beforeunload', checkIsExpiredPopUp);

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
