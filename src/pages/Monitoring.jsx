import React, { useMemo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import EmployeeStatusCard from '../components/EmployeeStatusCard';

// Corrige o problema do ícone padrão do Leaflet não aparecer
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente para controlar o foco do mapa
const MapFlyToController = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 15); // 15 é o nível de zoom
        }
    }, [position, map]);
    return null;
};

const Monitoring = () => {
  const { orders } = useOrders();
  const { users } = useAuth();
  const [selectedPosition, setSelectedPosition] = useState(null);

  const getUserById = (id) => users.find(u => u.id === id);

  const trackedOrders = useMemo(() => 
    orders.filter(order => order.status === 'Em Execução' && order.location)
  , [orders]);

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground mb-6">Monitoramento em Tempo Real</h1>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
        {/* Coluna da Lista de Funcionários */}
        <div className="lg:w-1/3 h-full overflow-y-auto pr-2 space-y-4">
            {trackedOrders.length > 0 ? (
                trackedOrders.map(order => {
                    const employee = getUserById(order.employeeId);
                    return (
                        <EmployeeStatusCard 
                            key={order.id} 
                            order={order}
                            employeeName={employee ? employee.name : 'Desconhecido'}
                            onFocus={() => setSelectedPosition([order.location.lat, order.location.lng])}
                        />
                    )
                })
            ) : (
                <div className="text-center text-muted-foreground mt-10">
                    <p>Nenhum técnico em campo no momento.</p>
                </div>
            )}
        </div>

        {/* Coluna do Mapa */}
        <div className="flex-1 h-full rounded-lg overflow-hidden shadow-medium">
          <MapContainer center={[-14.235, -51.9253]} zoom={4} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {trackedOrders.map(order => (
              <Marker key={order.id} position={[order.location.lat, order.location.lng]}>
                <Popup>
                  <div className="font-sans">
                    <h3 className="font-bold text-base mb-1">{order.title}</h3>
                    <p><span className="font-semibold">Cliente:</span> {order.client}</p>
                    <p><span className="font-semibold">Técnico:</span> {getUserById(order.employeeId)?.name || 'N/A'}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <MapFlyToController position={selectedPosition} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Monitoring; 