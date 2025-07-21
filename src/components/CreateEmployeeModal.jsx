import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const CreateEmployeeModal = ({ isOpen, onClose }) => {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Funcionário',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    try {
        if (formData.password.length < 3) {
            throw new Error("A senha deve ter no mínimo 3 caracteres.");
        }
        registerUser(formData);
        onClose();
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cadastrar Novo Usuário" size="large">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Nome Completo" value={formData.name} onChange={handleChange} required />
        <Input name="email" type="email" label="E-mail" value={formData.email} onChange={handleChange} required />
        <Input name="password" type="password" label="Senha" value={formData.password} onChange={handleChange} required />
        
        <div>
            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">Permissão</label>
            <select
                id="role"
                name="role"
                className="w-full px-3 py-2 border bg-transparent rounded-md text-sm border-input"
                value={formData.role}
                onChange={handleChange}
            >
                <option>Funcionário</option>
                <option>Administrador</option>
            </select>
        </div>
        
        {error && (
            <div className="bg-destructive/20 text-destructive text-sm font-medium p-3 rounded-md text-center">
                {error}
            </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="primary">Cadastrar Usuário</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEmployeeModal; 