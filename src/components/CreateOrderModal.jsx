import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { useOrders } from '../context/OrderContext';

const CreateOrderModal = ({ isOpen, onClose }) => {
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(formData);
    onClose(); // Fecha o modal após a criação
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Nova Ordem de Serviço">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" label="Título do Problema" value={formData.title} onChange={handleChange} required />
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Descrição</label>
            <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-3 py-2 border bg-transparent rounded-md text-sm border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.description}
                onChange={handleChange}
                required
            ></textarea>
        </div>
        <Input name="client" label="Nome do Cliente" value={formData.client} onChange={handleChange} required />
        <Input name="address" label="Endereço" value={formData.address} onChange={handleChange} required />
        <Input name="phone" label="Telefone" value={formData.phone} onChange={handleChange} />
        <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="primary">Criar O.S.</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrderModal; 