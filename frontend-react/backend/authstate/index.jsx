// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../serverapi/apiservice";

let authenticatedUser = null;

const AuthContext = createContext({
  loggedIn: !!localStorage.getItem("accessToken"),
  setAuthenticatedUser: () => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoggedIn(!!token);
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
    authenticatedUser = null;
  }

  function setAuthenticatedUser(user) {
    if (user?.access) {
      localStorage.setItem("accessToken", user.access);
      localStorage.setItem("refreshToken", user.refresh);
      authenticatedUser = user;
      setLoggedIn(true);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      authenticatedUser = null;
      setLoggedIn(false);
    }
  }

  const value = { loggedIn, setAuthenticatedUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function getAccessToken() {
  return (
    authenticatedUser?.access || localStorage.getItem("accessToken") || null
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function getBaseURL() {
  return BASE_URL;
}

export { AuthContext, AuthProvider, useAuth, getAccessToken, getBaseURL };
