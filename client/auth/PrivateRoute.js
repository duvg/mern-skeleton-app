import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from './auth-helper';

function PrivateRoute() {
  return auth.isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
