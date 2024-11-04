"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { signinServer, signupServer } from './server';

// Define the shape of the Auth context
interface AuthContextType {
  token: string | null;
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const decoded: any = JSON.parse(atob(savedToken.split('.')[1]));
      setUser(decoded.username);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      const response = await signinServer(username, password)

      if (response.error) {
        throw new Error('Invalid credentials');
      }

      const token = response.data

      setToken(token);
      setUser(username);
      localStorage.setItem('token', token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const signup = async (username: string, password: string) => {
    setError(null);
    try {
      const response = await signupServer(username, password);
      if (response) {
        throw new Error('Signup failed');
      }

      await login(username, password)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
