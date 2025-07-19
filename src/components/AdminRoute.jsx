import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user } = useAuth();

  // Se o usuário não for um Administrador, redireciona para a página inicial
  if (user?.role !== 'Administrador') {
    return <Navigate to="/" replace />;
  }

  // Se for Administrador, permite o acesso à rota filha
  return <Outlet />;
};

export default AdminRoute; 