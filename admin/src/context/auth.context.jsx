/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import apis from "../apis/apis";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = Boolean(token);
  const validToken = token ? `Bearer ${token}` : "";

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  };

  const loggedInUser = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(apis.auth.loggedIn, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loggedInUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        logOutUser,
        isLoggedIn,
        user,
        isLoading,
        validToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
