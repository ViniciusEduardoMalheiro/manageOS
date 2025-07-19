import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Simula o login, futuramente fará a chamada à API
  const login = (email, password) => {
    // Simulação de sucesso
    const fakeToken = 'fake-jwt-token';
    const fakeUser = { email, role: 'Administrador' }; // Simula um usuário admin

    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 