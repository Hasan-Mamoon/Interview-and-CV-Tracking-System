// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from "../Context/AuthContext";

// const ProtectedRoute = ({ element }) => {
//   const { auth } = useContext(AuthContext);

//   if (auth.loading) {
//     return <div>Loading...</div>;
//   }
//   if (!auth.loggedIn) {
//     return <Navigate to="/mentor/signin" replace />;
//   }

//   return element;
// };

// export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';

// const ProtectedRoute = ({ element }) => {
//   const { auth } = useAuth();

//   if (auth.user) {
//     return element;
//   } else {
//     return <Navigate to="/user/signin" />;
//   }
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


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