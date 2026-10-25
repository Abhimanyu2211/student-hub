import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserData, apiGetMe, apiLogin, apiRegister, apiLogout } from '../services/api';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<UserData>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    rollNumber: string;
    department: string;
    semester?: number;
  }) => Promise<UserData>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session on page refresh via HttpOnly cookie
  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await apiGetMe();
        setUser(response.user);
      } catch {
        // User is not logged in or cookie expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(credentials: { email: string; password: string }): Promise<UserData> {
    setError(null);
    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
      throw err;
    }
  }

  async function register(data: {
    name: string;
    email: string;
    password: string;
    rollNumber: string;
    department: string;
    semester?: number;
  }): Promise<UserData> {
    setError(null);
    try {
      const response = await apiRegister(data);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setError(msg);
      throw err;
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
