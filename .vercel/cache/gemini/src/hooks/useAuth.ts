import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const signup = async (formData: any) => {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  return { user, signup, login };
};
