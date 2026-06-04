import { useState } from 'react';
import { AlertTriangle, Scale, WifiOff } from 'lucide-react';
import { notificaciones as initialNotificaciones } from '../lib/mockData';

type Notificacion = typeof initialNotificaciones[0];

const iconMap: Record<string, React.ReactNode> = {
  alimento: <AlertTriangle size={18} className="text-[#F5A623]" />,
  peso: <Scale size={18} className="text-[#E53935]" />,
  señal: <WifiOff size={18} className="text-[#80756A]" />,
};

const estadoColors: Record<string, string> = {
  ALERTA: '#F5A623',
  CRÍTICO: '#E53935',
};

export default function NotificacionesPage() {
  const [items, setItems] = useState<(Notificacion & { leida: boolean })[]>(
    initialNotificaciones.map((n) => ({ ...n, leida: false }))
  );

  function markAsRead(id: number) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)));
  }

  const unread = items.filter((n) => !n.leida).length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-[#FFF8ED] text-2xl font-bold">Notificaciones</h1>
          {unread > 0 && (
            <span className="bg-[#E53935] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </div>
        <p className="text-[#80756A] text-sm mt-1">Alertas y eventos de tus colmenas</p>
      </div>

      <div className="space-y-3">
        {items.map((notif) => (
          <div
            key={notif.id}
            className={`bg-[#231710] border rounded-2xl p-5 transition-all duration-200 ${
              notif.leida ? 'border-[#2A1B13] opacity-60' : 'border-[#2A1B13] hover:border-[#F5A623]/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2A1B13] flex items-center justify-center shrink-0 mt-0.5">
                {iconMap[notif.tipo] ?? <AlertTriangle size={18} className="text-[#80756A]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[#FFF8ED] font-semibold text-sm">{notif.colmena}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                      color: estadoColors[notif.estado] ?? '#80756A',
                      backgroundColor: `${estadoColors[notif.estado] ?? '#80756A'}18`,
                    }}
                  >
                    {notif.estado}
                  </span>
                  {notif.leida && (
                    <span className="text-[#4CAF50] text-xs font-medium">Leida</span>
                  )}
                </div>
                <p className="text-[#80756A] text-sm mb-2">{notif.descripcion}</p>
                <p className="text-[#80756A] text-xs">{notif.fecha}</p>
              </div>

              {!notif.leida && (
                <button
                  onClick={() => markAsRead(notif.id)}
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
  );
}
