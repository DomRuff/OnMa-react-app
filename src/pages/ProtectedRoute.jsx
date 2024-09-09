import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../App';

const ProtectedRoute = ({ children }) => {
  const { isLoggedInContext } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = isLoggedInContext;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;