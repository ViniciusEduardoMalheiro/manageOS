import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

const AssignEmployeeModal = ({ isOpen, onClose, order }) => {
  const { users } = useAuth();
  const { orders } = useOrders();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const availableEmployees = useMemo(() => {
    const assignedEmployeeIds = new Set(
        orders
            .filter(o => o.status === 'Em Execução' && o.employeeId)
            .map(o => o.employeeId)
    );
    
    return users.filter(user => 
        user.role === 'Funcionário' && !assignedEmployeeIds.has(user.id)
    );
  }, [users, orders, isOpen]);

  const { assignAndStartOrder } = useOrders();

  const handleSubmit = () => {
    if (!selectedEmployeeId) return;
    const selectedEmployee = users.find(u => u.id === selectedEmployeeId);
    assignAndStartOrder(order.id, selectedEmployee);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Atribuir O.S. #${order?.id}`}>
      <div className="space-y-4">
        <p className="text-foreground">Selecione um funcionário disponível para a ordem: <strong>{order?.title}</strong></p>
        
        <div className="space-y-2 max-h-60 overflow-y-auto border border-border rounded-md p-2">
            {availableEmployees.length > 0 ? availableEmployees.map(employee => (
                <div 
                    key={employee.id}
                    onClick={() => setSelectedEmployeeId(employee.id)}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${selectedEmployeeId === employee.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                >
                    <p className="font-semibold">{employee.name}</p>
                    <p className="text-sm opacity-70">{employee.email}</p>
                </div>
            )) : <p className="text-muted-foreground text-center p-4">Nenhum funcionário disponível.</p>}
        </div>

        <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="button" variant="primary" onClick={handleSubmit} disabled={!selectedEmployeeId}>
                Confirmar Atribuição
            </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignEmployeeModal; 