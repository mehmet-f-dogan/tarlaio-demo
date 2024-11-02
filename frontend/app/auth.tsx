"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the Auth context
interface AuthContextType {
  token: string | null;
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
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

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for JWT in localStorage on initial load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Decode the token to get user info (this is a basic example; use a library for real scenarios)
      const decoded: any = JSON.parse(atob(savedToken.split('.')[1]));
      setUser(decoded.username);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const { token } = data;

      setToken(token);
      setUser(username);
      localStorage.setItem('token', token); // Save token to localStorage
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
    <AuthContext.Provider value={{ token, user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
