import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types/types';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    try {
      console.log('Attempting to refresh token');
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Token refreshed successfully');
        localStorage.setItem('token', data.token);
        setToken(data.token);
        return data.token; // Return the new token
      }
      console.log('Token refresh failed with status:', response.status);
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  // Set up a timer to refresh the token before it expires
  useEffect(() => {
    if (token) {
      // Refresh token every 6 days (token lasts 7 days)
      const refreshInterval = 6 * 24 * 60 * 60 * 1000; // 6 days in milliseconds
      const intervalId = setInterval(refreshToken, refreshInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        console.log('Verifying token:', token);
        try {
          const response = await fetch(`${API_BASE}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include'
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Token verification failed:', response.status, errorText);
            if (response.status === 401) {
              const newToken = await refreshToken();
              if (newToken) {
                // Use the new token for the retry request
                const retryResponse = await fetch(`${API_BASE}/auth/profile`, {
                  headers: { Authorization: `Bearer ${newToken}` },
                  credentials: 'include'
                });
                if (retryResponse.ok) {
                  const userData = await retryResponse.json();
                  console.log('User data from profile after refresh:', userData);
                  setUser(userData);
                  setIsAuthenticated(true);
                  localStorage.setItem('user', JSON.stringify(userData));
                } else {
                  console.error('Retry with new token failed');
                  setIsAuthenticated(false);
                  logout();
                }
              } else {
                console.error('Failed to get new token');
                setIsAuthenticated(false);
                logout();
              }
            } else {
              console.error('Non-401 error from profile endpoint');
              setIsAuthenticated(false);
              logout();
            }
          } else {
            const userData = await response.json();
            console.log('User data from profile:', userData);
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
          logout();
        }
      } else {
        console.log('No token found in state');
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return true; // Return success
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'An error occurred during login');
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'status'> & { password: string }) => {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return true; // Return success
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
    if (token) {
      try {
        const response = await fetch(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
          return true;
        } else {
          const newToken = await refreshToken();
          if (newToken) {
            const retryResponse = await fetch(`${API_BASE}/auth/profile`, {
              headers: { Authorization: `Bearer ${newToken}` },
              credentials: 'include'
            });
            if (retryResponse.ok) {
              const userData = await retryResponse.json();
              setUser(userData);
              setIsAuthenticated(true);
              localStorage.setItem('user', JSON.stringify(userData));
              return true;
            }
          }
          setIsAuthenticated(false);
          logout();
          return false;
        }
      } catch (error) {
        console.error('Error refreshing user:', error);
        setIsAuthenticated(false);
        logout();
        return false;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        signup, 
        logout,
        refreshUser,
        isAuthenticated,
        isAdmin: user?.email.endsWith('@admin.com') || false,
        loading,
        token
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import axios from 'axios';

// interface AuthContextType {
//   user: any;
//   signup: (userData: any) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const signup = async (userData: any) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/signup`, userData);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error;
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/login`, { email, password });
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };