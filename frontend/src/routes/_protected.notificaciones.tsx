import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Scale, WifiOff } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { notificaciones as initial } from "@/lib/mock-data";

export const Route = createFileRoute("/_protected/notificaciones")({
  component: NotificacionesPage,
});

const iconFor = (tipo: string) => tipo === "peso" ? Scale : tipo === "señal" ? WifiOff : AlertTriangle;

function NotificacionesPage() {
  const [items, setItems] = useState(initial);

  const markRead = (id: number) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, leida: true } : n));

  return (
    <div>
      <PageHeader title="Notificaciones" subtitle="Alertas y eventos recientes de tus colmenas." />
      <div className="space-y-3">
        {items.map((n) => {
          const Icon = iconFor(n.tipo);
          const critical = n.estado === "CRÍTICO";
          return (
            <div key={n.id} className={`bg-bg-card rounded-xl p-5 border border-border flex items-start gap-4 ${n.leida ? "opacity-60" : ""}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${critical ? "bg-status-error/15 text-status-error" : "bg-primary/15 text-primary"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-primary">{n.colmena}</span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${critical ? "bg-status-error/20 text-status-error" : "bg-primary/20 text-primary"}`}>
                    {n.estado}
                  </span>
                </div>
                <p className="text-sm text-text-primary mt-1">{n.descripcion}</p>
                <p className="text-xs text-text-muted mt-1">{n.fecha}</p>
              </div>
              {!n.leida && (
                <button onClick={() => markRead(n.id)} className="text-xs text-primary hover:underline whitespace-nowrap">
                  Marcar como leída
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
