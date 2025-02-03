import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

// Reducer function to manage authentication state
// Reducer function to manage authentication state
export const authReducer = (state, action) => {
  console.log("Previous state:", state);
  console.log("Action:", action);

  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN action.payload:", action.payload);
      const newStateLogin = { user: action.payload };
      console.log("New state after LOGIN:", newStateLogin);
      return newStateLogin;
    case "LOGOUT":
      const newStateLogout = { user: null };
      console.log("New state after LOGOUT:", newStateLogout);
      return newStateLogout;
    default:
      return state;
  }
};


// Function to validate token
const validateToken = async () => {
  try {
    const response = await axios.post("http://localhost:3070/auth/validate-token", {}, { withCredentials: true });
    console.log("validateToken response:", response.data);
    return response.data.user;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
};

// Function to refresh token
const refreshToken = async () => {
  try {
    const response = await axios.post("http://localhost:3070/auth/refresh-token", {}, { withCredentials: true });
    console.log("refreshToken response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// AuthContextProvider component to manage authentication logic
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Initial state
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Validate the token and set the user state
        const user = await validateToken();
        if (user) {
          console.log("USER TK: ", user);
          dispatch({ type: "LOGIN", payload: user });
        } else {
          console.log("USER TK no: ", user);
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();

    // Set up a timer to refresh the token before it expires
    const interval = setInterval(async () => {
      const result = await refreshToken();
      if (!result) {
        dispatch({ type: "LOGOUT" });
      }
    }, 1 * 60 * 1000); // Refresh token every 14 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};