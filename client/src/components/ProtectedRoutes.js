import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return <div>Loading...</div>;
  }
  if (!auth.loggedIn) {
    return <Navigate to="/mentor/signin" replace />;
  }

  return element;
};

export default ProtectedRoute;
