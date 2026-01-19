import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios instance with interceptor
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    // Check if tokens exist in localStorage
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    // TODO: Verify token validity API call here logic
    if (access) {
      // Mock user restoration for now or fetch /auth/me
      // We will implement fetchMe later
      setUser({ token: access }); 
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login/', { username, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setUser({ token: res.data.access });
      return { success: true };
    } catch (err) {
      console.error("Login Error:", err);
      return { success: false, error: err.response?.data?.detail || "Network Error: Is Backend Running?" };
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const register = async (userData) => {
      try {
          await api.post('/auth/register/', userData);
          return { success: true };
      } catch (err) {
          console.error("Register Error:", err);
          return { success: false, error: err.response?.data || "Network Error: Is Backend Running?" };
      }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
