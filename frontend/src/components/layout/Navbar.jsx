// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Warehouse, BarChart2, TrendingUp,
  Bell, Settings, LogOut, Menu, X,
} from 'lucide-react'
import { useUsuario } from '../../contexts/UsuarioContext.jsx'
import BeeIcon from '../BeeIcon.jsx'

// Ya no importamos mockData acá — el badge viene del contexto

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/colmenares', label: 'Colmenares', icon: Warehouse },
  { to: '/analisis', label: 'Análisis', icon: BarChart2 },
  { to: '/predicciones', label: 'Predicciones', icon: TrendingUp },
  { to: '/notificaciones', label: 'Notificaciones', icon: Bell, esBell: true },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

function ContenidoSidebar({ alCerrar }) {
  const navigate = useNavigate()
  const { usuario, logout, sinLeer } = useUsuario()

  function handleLogout() {
    logout()
    navigate('/login')
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
        {alCerrar && (
          <button
            onClick={alCerrar}
            className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200 lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {usuario && (
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-[#231710] border border-[#2A1B13]">
          <p className="text-[#FFF8ED] text-sm font-semibold truncate">{usuario.nombre}</p>
          <p className="text-[#80756A] text-xs truncate">{usuario.email}</p>
        </div>
      )}

      <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
        {NAV_LINKS.map(({ to, label, icon: Icon, esBell }) => (
          <NavLink
            key={to}
            to={to}
            onClick={alCerrar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#F5A623] text-[#1A120B]'
                  : 'text-[#80756A] hover:text-[#FFF8ED] hover:bg-[#231710]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {esBell && sinLeer > 0 && (
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                      isActive ? 'bg-[#1A120B]/20 text-[#1A120B]' : 'bg-[#E53935] text-white'
                    }`}
                  >
                    {sinLeer}
                  </span>
                )}
              </>
            )}
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
  )
}

function Navbar() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-[#2A1B13] border-r border-[#231710] shrink-0">
        <ContenidoSidebar />
      </aside>

      {sidebarAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2A1B13] border-r border-[#231710] flex flex-col transform transition-transform duration-200 ease-in-out lg:hidden ${
          sidebarAbierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ContenidoSidebar alCerrar={() => setSidebarAbierto(false)} />
      </aside>

      <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#2A1B13] border-b border-[#231710] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F5A623] flex items-center justify-center">
            <BeeIcon className="w-4 h-4 text-[#1A120B]" />
          </div>
          <span className="text-[#F5A623] font-bold text-base">Smart Hive</span>
        </div>
        <button
          onClick={() => setSidebarAbierto(true)}
          className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200"
        >
          <Menu size={22} />
        </button>
      </header>
    </>
  )
}

export default Navbar
