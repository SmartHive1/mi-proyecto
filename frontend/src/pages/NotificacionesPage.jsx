// src/pages/NotificacionesPage.jsx
import { useState } from 'react'
import { AlertTriangle, Scale, WifiOff, CheckCheck } from 'lucide-react'
import { useUsuario } from '../contexts/UsuarioContext.jsx'

const iconos = {
  alimento: <AlertTriangle size={18} className="text-[#F5A623]" />,
  peso: <Scale size={18} className="text-[#E53935]" />,
  señal: <WifiOff size={18} className="text-[#80756A]" />,
}

const coloresEstado = {
  ALERTA: '#F5A623',
  CRÍTICO: '#E53935',
}

const FILTROS = ['Todas', 'ALERTA', 'CRÍTICO', 'Leídas']

function NotificacionesPage() {
  const { notificaciones, marcarLeida, marcarTodasLeidas, sinLeer } = useUsuario()
  const [filtro, setFiltro] = useState('Todas')

  const itemsFiltrados = notificaciones.filter((n) => {
    if (filtro === 'Todas') return true
    if (filtro === 'Leídas') return n.leida
    return n.estado === filtro
  })

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-[#FFF8ED] text-2xl font-bold">Notificaciones</h1>
            {sinLeer > 0 && (
              <span className="bg-[#E53935] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {sinLeer}
              </span>
            )}
          </div>
          {sinLeer > 0 && (
            <button
              onClick={marcarTodasLeidas}
              className="flex items-center gap-2 text-xs font-medium text-[#80756A] border border-[#2A1B13] px-3 py-2 rounded-xl hover:text-[#FFF8ED] hover:border-[#F5A623]/40 transition-all duration-200"
            >
              <CheckCheck size={14} />
              Marcar todas como leídas
            </button>
          )}
        </div>
        <p className="text-[#80756A] text-sm mt-1">Alertas y eventos de tus colmenas</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              filtro === f
                ? 'bg-[#F5A623] text-[#1A120B]'
                : 'bg-[#231710] text-[#80756A] border border-[#2A1B13] hover:text-[#FFF8ED]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {itemsFiltrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#80756A] text-base">No hay notificaciones en esta categoría.</p>
          </div>
        )}
        {itemsFiltrados.map((notif) => (
          <div
            key={notif.id}
            className={`bg-[#231710] border rounded-2xl p-5 transition-all duration-200 ${
              notif.leida ? 'border-[#2A1B13] opacity-60' : 'border-[#2A1B13] hover:border-[#F5A623]/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2A1B13] flex items-center justify-center shrink-0 mt-0.5">
                {iconos[notif.tipo] ?? <AlertTriangle size={18} className="text-[#80756A]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[#FFF8ED] font-semibold text-sm">{notif.colmena}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                      color: coloresEstado[notif.estado] ?? '#80756A',
                      backgroundColor: `${coloresEstado[notif.estado] ?? '#80756A'}18`,
                    }}
                  >
                    {notif.estado}
                  </span>
                  {notif.leida && (
                    <span className="text-[#4CAF50] text-xs font-medium">Leída</span>
                  )}
                </div>
                <p className="text-[#80756A] text-sm mb-2">{notif.descripcion}</p>
                <p className="text-[#80756A] text-xs">{notif.fecha}</p>
              </div>

              {!notif.leida && (
                <button
                  onClick={() => marcarLeida(notif.id)}
                  className="shrink-0 text-xs font-medium text-[#80756A] border border-[#2A1B13] px-3 py-1.5 rounded-xl hover:text-[#FFF8ED] hover:border-[#F5A623]/40 transition-all duration-200 whitespace-nowrap"
                >
                  Marcar como leída
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificacionesPage
