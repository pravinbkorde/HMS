import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from sessionStorage on page reload
    const role = sessionStorage.getItem('user');
    const username = sessionStorage.getItem('username');
    if (role && username) {
      setUser({ role, username });
    }
  }, []);

  const login = (role, username) => {
    setUser({ role, username });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
