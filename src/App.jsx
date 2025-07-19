import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        {/* Adicione outras rotas do admin aqui, ex: /employees */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
