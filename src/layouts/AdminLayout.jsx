import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const SidebarLink = ({ to, children }) => {
  const activeClass = 'bg-sidebar-accent text-sidebar-accent-foreground';
  const inactiveClass = 'hover:bg-sidebar-accent/50';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all ${isActive ? activeClass : inactiveClass}`
      }
    >
      {children}
    </NavLink>
  );
};

const Sidebar = () => {
  const { logout } = useAuth();
  const { user } = useAuth();

  return (
    <aside className="w-64 h-screen bg-sidebar-background text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-soft">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-center text-primary">
          ManageOS
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink to="/">Dashboard</SidebarLink>
        <SidebarLink to="/employees">Funcionários</SidebarLink>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-4">
          <p className="text-sm font-semibold">{user?.email}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <Button
          onClick={logout}
          variant="secondary"
          className="w-full"
        >
          Sair
        </Button>
      </div>
    </aside>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-auto h-screen">
        <div className="animate-fade-in-up">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 