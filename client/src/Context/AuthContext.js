// import React, { createContext, useReducer, useEffect } from 'react';
// import axios from 'axios';

// // Create AuthContext
// export const AuthContext = createContext();

// // Reducer function to manage authentication state
// // Reducer function to manage authentication state
// export const authReducer = (state, action) => {
//   console.log("Previous state:", state);
//   console.log("Action:", action);

//   switch (action.type) {
//     case "LOGIN":
//       console.log("LOGIN action.payload:", action.payload);
//       const newStateLogin = { user: action.payload };
//       console.log("New state after LOGIN:", newStateLogin);
//       return newStateLogin;
//     case "LOGOUT":
//       const newStateLogout = { user: null };
//       console.log("New state after LOGOUT:", newStateLogout);
//       return newStateLogout;
//     default:
//       return state;
//   }
// };


// // Function to validate token
// const validateToken = async () => {
//   try {
//     const response = await axios.post("http://localhost:3070/auth/validate-token", {}, { withCredentials: true });
//     console.log("validateToken response:", response.data);
//     return response.data.user;
//   } catch (error) {
//     console.error("Token validation failed:", error);
//     return null;
//   }
// };

// // Function to refresh token
// const refreshToken = async () => {
//   try {
//     const response = await axios.post("http://localhost:3070/auth/refresh-token", {}, { withCredentials: true });
//     console.log("refreshToken response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     return null;
//   }
// };

// // AuthContextProvider component to manage authentication logic
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null, // Initial state
//   });

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Validate the token and set the user state
//         const user = await validateToken();
//         if (user) {
//           console.log("USER TK: ", user);
//           dispatch({ type: "LOGIN", payload: user });
//         } else {
//           console.log("USER TK no: ", user);
//           dispatch({ type: "LOGOUT" });
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//       }
//     };

//     checkAuth();

//     // Set up a timer to refresh the token before it expires
//     const interval = setInterval(async () => {
//       const result = await refreshToken();
//       if (!result) {
//         dispatch({ type: "LOGOUT" });
//       }
//     }, 14 * 60 * 1000); // Refresh token every 14 minutes

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth: state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

// ✅ Create AuthContext
export const AuthContext = createContext();

// ✅ Reducer function for authentication state
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

// ✅ Function to validate token
const validateToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3070/auth/validate-token",
      {},
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    console.error("Token validation failed:", error.response?.data || error.message);
    return null;
  }
};

// ✅ Function to refresh token
const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3070/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    return null;
  }
};

// ✅ AuthContextProvider component to manage authentication logic
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  useEffect(() => {
    let isMounted = true;
    let failedRefreshAttempts = 0;

    const checkAuth = async () => {
      const user = await validateToken();
      if (user && isMounted) {
        dispatch({ type: "LOGIN", payload: user });
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
      }
    };

    checkAuth();

    // ✅ Refresh token every 14 minutes (before 15-minute expiry)
    const interval = setInterval(async () => {
      if (failedRefreshAttempts >= 3) {
        console.warn("Too many failed token refresh attempts. Logging out.");
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        return clearInterval(interval);
      }

      const user = await refreshToken();
      if (!user) {
        failedRefreshAttempts++;
      } else {
        failedRefreshAttempts = 0; // ✅ Reset failed attempts on success
        dispatch({ type: "LOGIN", payload: user });
        localStorage.setItem("user", JSON.stringify(user)); // ✅ Persist refreshed user
      }
    }, 14 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // ✅ Function to log in user
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3070/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.User));
      dispatch({ type: "LOGIN", payload: data.User });

      return { success: true, user: data.User };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Function to log out user
  const logout = async () => {
    try {
      await fetch("http://localhost:3070/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth: state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
