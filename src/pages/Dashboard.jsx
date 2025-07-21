import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import OrderDetailsModal from '../components/OrderDetailsModal';
import CreateOrderModal from '../components/CreateOrderModal';
import AssignEmployeeModal from '../components/AssignEmployeeModal'; // Importa o novo modal
import DropdownMenu, { DropdownMenuItem } from '../components/DropdownMenu';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const StatusBadge = ({ status }) => {
  const baseClasses = 'px-2.5 py-0.5 text-xs font-semibold rounded-full';
  const statusClasses = {
    Iniciada: 'bg-blue-100 text-blue-800',
    'Em Execução': 'bg-warning-light text-warning-foreground',
    Finalizada: 'bg-success-light text-success-foreground',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const OrderActions = ({ order, onDetailsClick, onAssignClick }) => {
    const { finalizeOrder } = useOrders();

    return (
        <DropdownMenu
            trigger={
                <Button variant="ghost">
                    Ações <span className="text-xs">▼</span>
                </Button>
            }
        >
            <DropdownMenuItem onClick={onDetailsClick}>
                Ver Detalhes
            </DropdownMenuItem>

            {order.status === 'Iniciada' && (
                <DropdownMenuItem onClick={onAssignClick}>
                    Atribuir e Iniciar O.S.
                </DropdownMenuItem>
            )}

            {order.status === 'Em Execução' && (
                <DropdownMenuItem onClick={() => finalizeOrder(order.id)}>
                    Finalizar O.S.
                </DropdownMenuItem>
            )}
        </DropdownMenu>
    );
};


const Dashboard = () => {
  const { orders } = useOrders(); // Usa o contexto
  const { users } = useAuth(); // Pega a lista de todos os usuários
  const [filter, setFilter] = useState('Todos');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // Novo estado
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleOpenAssign = (order) => { // Nova função
    setSelectedOrder(order);
    setIsAssignModalOpen(true);
  };

  const getUserNameById = (id) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : 'N/A';
  };

  const filteredOrders = useMemo(() => {
    if (filter === 'Todos') return orders;
    return orders.filter((order) => order.status === filter);
  }, [filter, orders]);

  const stats = useMemo(() => ({
    iniciada: orders.filter(o => o.status === 'Iniciada').length,
    emExecucao: orders.filter(o => o.status === 'Em Execução').length,
    finalizada: orders.filter(o => o.status === 'Finalizada').length,
  }), [orders]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>Criar Nova O.S</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-semibold text-muted-foreground">Iniciadas</h2>
          <p className="text-4xl font-bold text-primary mt-1">{stats.iniciada}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-muted-foreground">Em Execução</h2>
          <p className="text-4xl font-bold text-warning mt-1">{stats.emExecucao}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-muted-foreground">Finalizadas</h2>
          <p className="text-4xl font-bold text-success mt-1">{stats.finalizada}</p>
        </Card>
      </div>

      {/* Orders List */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">Ordens de Serviço</h2>
        <div className="flex items-center gap-2">
            <Button variant={filter === 'Todos' ? 'primary' : 'ghost'} onClick={() => setFilter('Todos')}>Todos</Button>
            <Button variant={filter === 'Iniciada' ? 'primary' : 'ghost'} onClick={() => setFilter('Iniciada')}>Iniciada</Button>
            <Button variant={filter === 'Em Execução' ? 'primary' : 'ghost'} onClick={() => setFilter('Em Execução')}>Em Execução</Button>
            <Button variant={filter === 'Finalizada' ? 'primary' : 'ghost'} onClick={() => setFilter('Finalizada')}>Finalizada</Button>
        </div>
      </div>
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Título</th>
                <th scope="col" className="px-6 py-3">Cliente</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Responsável</th>
                <th scope="col" className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-accent/50">
                  <td className="px-6 py-4 font-medium text-foreground">{order.title}</td>
                  <td className="px-6 py-4">{order.client}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4">{getUserNameById(order.employeeId)}</td>
                  <td className="px-6 py-4 text-right">
                    <OrderActions 
                        order={order} 
                        onDetailsClick={() => handleOpenDetails(order)}
                        onAssignClick={() => handleOpenAssign(order)} // Passa a nova função
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modais */}
      <OrderDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        order={selectedOrder} 
      />
      <CreateOrderModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <AssignEmployeeModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        order={selectedOrder} 
      />
    </>
  );
};

export default Dashboard; 