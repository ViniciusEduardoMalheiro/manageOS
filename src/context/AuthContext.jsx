import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../utils/mockUsers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);

  // Carregar usuários e estado de login inicial
  useEffect(() => {
    setUsers(mockUsers);
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const fakeToken = `fake-jwt-token-for-${foundUser.id}`;
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setToken(fakeToken);
      setUser(foundUser);
      return foundUser;
    } else {
      throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const registerUser = (newUser) => {
    // Simula a criação de um novo usuário
    const userExists = users.some(u => u.email === newUser.email);
    if(userExists) {
        throw new Error("Este e-mail já está em uso.");
    }

    const newUserWithId = { ...newUser, id: Date.now() }; // Gera um ID simples
    setUsers(prevUsers => [...prevUsers, newUserWithId]);
    // Em um app real, aqui você faria uma chamada de API para o backend
    return newUserWithId;
  };

  return (
    <AuthContext.Provider value={{ user, token, users, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 