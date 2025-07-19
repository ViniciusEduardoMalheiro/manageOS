import React from 'react';
import Card from './Card';
import Button from './Button';

const EmployeeStatusCard = ({ order, onFocus }) => {
  return (
    <Card className="animate-fade-in-up !p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-lg text-foreground">{order.employee}</p>
          <p className="text-sm text-muted-foreground">Em serviço</p>
        </div>
        <div className="text-right">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success-light text-success-foreground">
                Ativo
            </span>
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">
          {order.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {order.address}
        </p>
        <p className="text-xs text-muted-foreground">
          ({order.location.lat.toFixed(4)}, {order.location.lng.toFixed(4)})
        </p>
      </div>
      <Button variant="link" onClick={onFocus} className="w-full mt-4 text-sm">
        Focar no Mapa
      </Button>
    </Card>
  );
};

export default EmployeeStatusCard; 