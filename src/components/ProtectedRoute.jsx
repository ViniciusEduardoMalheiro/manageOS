import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderiza a rota filha (ou o layout aninhado)
  return <Outlet />;
};

export default ProtectedRoute; 