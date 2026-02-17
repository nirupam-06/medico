import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [uid, setUid] = useState(localStorage.getItem('uid') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    setIsLoggedIn(!!token);
    setUid(localStorage.getItem('uid') || '');
    setRole(localStorage.getItem('role') || '');
  }, [token]);

  const login = (userRole = 'admin', userUid = '') => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUid(userUid);
    setToken('dummy-token');
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('role', userRole);
    if (userUid) {
      localStorage.setItem('uid', userUid);
    }
    console.log("Auth", userRole, userUid);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUid('');
    setRole('');
    setToken('');
  };

  const setUidContext = (newUid) => {
    setUid(newUid);
    localStorage.setItem('uid', newUid);
  };

  const setRoleContext = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      uid,
      setUidContext,
      role,
      setRoleContext
    }}>
      {children}
    </AuthContext.Provider>
  );
};