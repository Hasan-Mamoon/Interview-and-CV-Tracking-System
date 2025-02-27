import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Reducer function for authentication state
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

const validateToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3070/auth/validate-token",
      {},
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    console.error(
      "Token validation failed:",
      error.response?.data || error.message
    );
    return null;
  }
};

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3070/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    return null;
  }
};

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

    // Refresh token every 14 minutes (before 15-minute expiry)
    const interval = setInterval(
      async () => {
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
          failedRefreshAttempts = 0;
          dispatch({ type: "LOGIN", payload: user });
          localStorage.setItem("user", JSON.stringify(user));
        }
      },
      14 * 60 * 1000
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

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
