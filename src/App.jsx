import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import Employees from './pages/Employees';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        
        {/* Rotas exclusivas para Administradores */}
        <Route element={<AdminRoute />}>
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/employees" element={<Employees />} />
        </Route>

        {/* Adicione outras rotas aqui */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
