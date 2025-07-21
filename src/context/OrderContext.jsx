import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockOrders } from '../utils/mockData';

// Função para gerar uma localização aleatória perto de um ponto central (ex: São Paulo)
const getRandomLocation = () => {
    const centerLat = -23.55052;
    const centerLng = -46.633308;
    return {
        lat: centerLat + (Math.random() - 0.5) * 0.1,
        lng: centerLng + (Math.random() - 0.5) * 0.1,
    };
};

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const addOrder = (newOrderData) => {
    const newOrder = {
      ...newOrderData,
      id: Date.now(), // Gera um ID simples
      status: 'Iniciada',
      creationDate: new Date().toISOString().split('T')[0], // Data de hoje no formato YYYY-MM-DD
      employee: null,
      location: null,
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]); // Adiciona a nova ordem no início da lista
    return newOrder;
  };

  const assignAndStartOrder = (orderId, employee) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          return { 
            ...order, 
            status: 'Em Execução', 
            employeeId: employee.id, // Salva o ID do funcionário
            location: getRandomLocation(),
          };
        }
        return order;
      })
    );
  };

  const finalizeOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          return { 
            ...order, 
            status: 'Finalizada',
            location: null,
          };
        }
        return order;
      })
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, assignAndStartOrder, finalizeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrderContext);
}; 