import React, { createContext, useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://blog-platform.kata.academy/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch');
          }

          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error('Error restoring user:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  // логин
  const login = async (email, password) => {
    try {
      const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      //сохраняем в стейте пользователя и сохраняем в localStorage его действующий токен.
      setUser(data.user);
      localStorage.setItem('token', data.user.token);
      return data.user;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <Spin tip="Loading" size="large" />;
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
