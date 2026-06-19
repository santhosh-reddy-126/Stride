import { createContext, useState, useCallback, useEffect } from 'react';
import { loginUser, signupUser, logoutUser, getStoredUser } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    setUser({ token: data.token, name: data.name, email: data.email });
    return data;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    return signupUser(name, email, password);
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, handleUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
