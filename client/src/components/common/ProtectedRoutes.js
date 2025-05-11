import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';


const ProtectedRoute = ({ element}) => {
  const { auth } = useContext(AuthContext);

  // if (auth.user) {
  //   return element;
  // } else {
  //   console.log("ProtectedRoute: user not found");
  //   return <Navigate to="/user/signin" />;
  // }
  if (!auth.user) return <Navigate to="/user/signin" />;

  return element;
};

export default ProtectedRoute;