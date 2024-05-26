// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loggedIn: false, loading: true });

  useEffect(() => {
    console.log("IFDKDK");
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3070/auth/mentor/check-auth");
        
        console.log(response.data);
        setAuth({ loggedIn: response.data.loggedIn, loading: false });
      } catch (error) {
        setAuth({ loggedIn: false, loading: false });
      }
    };

    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
