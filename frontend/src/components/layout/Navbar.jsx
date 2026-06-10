// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Warehouse, BarChart2, TrendingUp,
  Bell, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useUsuario } from '../../contexts/UsuarioContext.jsx'
import BeeIcon from '../BeeIcon.jsx'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/colmenares', label: 'Colmenares', icon: Warehouse },
  { to: '/analisis', label: 'Análisis', icon: BarChart2 },
  { to: '/predicciones', label: 'Predicciones', icon: TrendingUp },
  { to: '/notificaciones', label: 'Notificaciones', icon: Bell, esBell: true },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

function ContenidoSidebar({ alCerrar, colapsado }) {
  const navigate = useNavigate()
  const { usuario, logout, sinLeer } = useUsuario()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center border-b border-[#2A1B13] ${colapsado ? 'justify-center px-2 py-5' : 'justify-between px-6 py-5'}`}>
        {!colapsado && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center shrink-0">
              <BeeIcon className="w-5 h-5 text-[#1A120B]" />
            </div>
            <span className="text-[#F5A623] font-bold text-lg tracking-tight">Smart Hive</span>
          </div>
        )}
        {colapsado && (
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
            <BeeIcon className="w-5 h-5 text-[#1A120B]" />
          </div>
        )}
        {alCerrar && (
          <button
            onClick={alCerrar}
            className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200 lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {usuario && !colapsado && (
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
            title={colapsado ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                colapsado ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#F5A623] text-[#1A120B]'
                  : 'text-[#80756A] hover:text-[#FFF8ED] hover:bg-[#231710]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative shrink-0">
                  <Icon size={18} />
                  {esBell && sinLeer > 0 && colapsado && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E53935]" />
                  )}
                </div>
                {!colapsado && (
                  <>
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
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2A1B13]">
        <button
          onClick={handleLogout}
          title={colapsado ? 'Cerrar sesión' : undefined}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-[#80756A] hover:text-[#E53935] hover:bg-[#231710] transition-all duration-200 ${
            colapsado ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} />
          {!colapsado && 'Cerrar sesión'}
        </button>
      </div>
    </div>
  )
}

function Navbar({ sidebarAbierto, setSidebarAbierto, sidebarColapsado, setSidebarColapsado }) {
  return (
    <>
      {/* Sidebar desktop — colapsable */}
      <aside
        className={`hidden lg:flex flex-col bg-[#2A1B13] border-r border-[#231710] shrink-0 transition-all duration-200 ${
          sidebarColapsado ? 'w-16' : 'w-64'
        }`}
      >
        <ContenidoSidebar colapsado={sidebarColapsado} />
        {/* Botón toggle colapsar */}
        <button
          onClick={() => setSidebarColapsado(!sidebarColapsado)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-5 h-10 bg-[#F5A623] rounded-r-md text-[#1A120B] hover:bg-[#e09620] transition-colors duration-200"
          style={{ left: sidebarColapsado ? '64px' : '256px' }}
          title={sidebarColapsado ? 'Expandir menú' : 'Colapsar menú'}
        >
          {sidebarColapsado ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Overlay mobile */}
      {sidebarAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      {/* Sidebar mobile — drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2A1B13] border-r border-[#231710] flex flex-col transform transition-transform duration-200 ease-in-out lg:hidden ${
          sidebarAbierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ContenidoSidebar alCerrar={() => setSidebarAbierto(false)} />
      </aside>
    </>
  )
}

export { Navbar as default, Navbar }
