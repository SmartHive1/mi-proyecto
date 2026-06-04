import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Warehouse,
  BarChart2,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { logout } from '../lib/auth';
import { getStoredUser } from '../lib/auth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/colmenares', label: 'Colmenares', icon: Warehouse },
  { to: '/analisis', label: 'Análisis', icon: BarChart2 },
  { to: '/predicciones', label: 'Predicciones', icon: TrendingUp },
  { to: '/notificaciones', label: 'Notificaciones', icon: Bell },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
];

function BeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6 5.2 5 5.5 4.5 6.5C4 7.5 4.5 8.7 5.5 9.2C5.2 10 5.2 10.8 5.5 11.5L3 14l2 1-2 2 3-1c.8 1.2 2 2.1 3.5 2.5L9 21h1.5l.5-2h2l.5 2H15l-.5-2.5c1.5-.4 2.7-1.3 3.5-2.5l3 1-2-2 2-1-2.5-2.5c.3-.7.3-1.5 0-2.3 1-.5 1.5-1.7 1-2.7C19 4.5 18 4.2 17 4.5 16.5 3.5 14.5 2 12 2z" />
      <ellipse cx="10" cy="11" rx="1.2" ry="1.5" fill="#1A120B" />
      <ellipse cx="14" cy="11" rx="1.2" ry="1.5" fill="#1A120B" />
      <path d="M9 13.5c.8.8 2 1.2 3 1.2s2.2-.4 3-1.2" stroke="#1A120B" strokeWidth="0.8" fill="none" />
      <path d="M8 7.5C8 7.5 9 6 12 6s4 1.5 4 1.5" stroke="#1A120B" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A1B13]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
            <BeeIcon className="w-5 h-5 text-[#1A120B]" />
          </div>
          <span className="text-[#F5A623] font-bold text-lg tracking-tight">Smart Hive</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200 lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {user && (
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-[#231710] border border-[#2A1B13]">
          <p className="text-[#FFF8ED] text-sm font-semibold truncate">{user.name}</p>
          <p className="text-[#80756A] text-xs truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#F5A623] text-[#1A120B]'
                  : 'text-[#80756A] hover:text-[#FFF8ED] hover:bg-[#231710]'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2A1B13]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-[#80756A] hover:text-[#E53935] hover:bg-[#231710] transition-all duration-200"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#1A120B] overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2A1B13] border-r border-[#231710] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2A1B13] border-r border-[#231710] flex flex-col transform transition-transform duration-200 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#2A1B13] border-b border-[#231710] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F5A623] flex items-center justify-center">
              <BeeIcon className="w-4 h-4 text-[#1A120B]" />
            </div>
            <span className="text-[#F5A623] font-bold text-base">Smart Hive</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200"
          >
            <Menu size={22} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
