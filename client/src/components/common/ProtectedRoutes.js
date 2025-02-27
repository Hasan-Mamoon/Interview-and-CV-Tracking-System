import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';


const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  console.log("ProtectedRoute: user", auth.user);

  if (auth.user) {
    return element;
  } else {
    console.log("ProtectedRoute: user not found");
    return <Navigate to="/user/signin" />;
  }
};

export default ProtectedRoute;