// // src/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ loggedIn: false, loading: true });

//   useEffect(() => {
//     console.log("IFDKDK");
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:3070/auth/mentor/check-auth");
        
//         console.log(response.data);
//         setAuth({ loggedIn: response.data.loggedIn, loading: false });
//       } catch (error) {
//         setAuth({ loggedIn: false, loading: false });
//       }
//     };

//     checkAuth();
//   }, []);


//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useReducer, useEffect, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Reducer function to manage authentication state
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider component to manage authentication logic
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Initial state
  });

  // Load user data from localStorage when the app is initialized
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Save the user to localStorage whenever the user state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // For debugging: Print the auth context state
  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in components
export const useAuth = () => {
  return useContext(AuthContext);
};
