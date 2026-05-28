import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ArrowLeft, Boxes } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { colmenares, colmenas } from "@/lib/mock-data";

export const Route = createFileRoute("/_protected/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const colmenar = colmenares.find((c) => c.id === selected);
  const list = colmenas.filter((c) => c.colmenarId === selected);

  if (selected && colmenar) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <PageHeader title={colmenar.nombre} subtitle={colmenar.ubicacion} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c.id} className="bg-bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">{c.numero}</span>
                <span className="text-sm text-text-muted">{c.peso} kg</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                  <span>Nivel de alimento</span>
                  <span>{c.nivelAlimento}%</span>
                </div>
                <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${c.nivelAlimento}%` }} />
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-text-muted">Sin colmenas registradas.</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen de tus colmenares activos." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colmenares.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className="text-left bg-bg-card rounded-xl p-6 border border-border hover:border-primary hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-primary">
              <Boxes className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{c.nombre}</h3>
            </div>
            <p className="mt-2 flex items-center gap-1 text-sm text-text-muted">
              <MapPin className="w-3.5 h-3.5" /> {c.ubicacion}
            </p>
            <p className="mt-4 text-3xl font-bold text-text-primary">
              {c.cantidadColmenas} <span className="text-sm font-normal text-text-muted">colmenas</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
