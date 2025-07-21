import React from 'react';
import Modal from './Modal';

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <p className="text-md text-foreground">{value || 'N/A'}</p>
    </div>
);

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalhes da O.S. #${order.id}`}>
        <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-2">{order.title}</h3>
                <p className="text-sm text-foreground">{order.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Cliente" value={order.client} />
                <DetailItem label="Endereço" value={order.address} />
                <DetailItem label="Telefone" value={order.phone} />
                <DetailItem label="Profissional Responsável" value={order.employee} />
                <DetailItem label="Status" value={order.status} />
                <DetailItem label="Data de Criação" value={new Date(order.creationDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} />
            </div>
        </div>
    </Modal>
  );
};

export default OrderDetailsModal; 