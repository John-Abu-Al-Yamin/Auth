import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (values) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/login", values);
      setToken(res.data.token);
      toast.success(res.data.message || "Login Success");
      navigate("/");
    } catch (error) {
      console.error(error.response);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/register", values);
      setToken(res.data.token);
      toast.success(res.data.message || "Registration Successful");
      navigate("/");
    } catch (error) {
      console.error(error.response);
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    token,
    isLoading,
    login,
    register,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};