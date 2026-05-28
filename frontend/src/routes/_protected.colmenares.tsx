import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { colmenares, colmenas } from "@/lib/mock-data";

export const Route = createFileRoute("/_protected/colmenares")({
  component: ColmenaresPage,
});

function ColmenaresPage() {
  const [filter, setFilter] = useState<number | "all">("all");
  const visible = filter === "all" ? colmenares : colmenares.filter((c) => c.id === filter);

  return (
    <div>
      <PageHeader title="Colmenares" subtitle="Listado completo de colmenas por colmenar." />

      <div className="mb-6">
        <label className="text-xs font-semibold tracking-wider text-text-muted">FILTRAR POR COLMENAR</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="mt-1.5 block w-full sm:w-72 bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todos los colmenares</option>
          {colmenares.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="space-y-6">
        {visible.map((col) => {
          const list = colmenas.filter((c) => c.colmenarId === col.id);
          return (
            <section key={col.id} className="bg-bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-primary">{col.nombre}</h2>
              <p className="text-sm text-text-muted mb-4">{col.ubicacion}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.length === 0 && <p className="text-text-muted text-sm">Sin colmenas.</p>}
                {list.map((c) => (
                  <div key={c.id} className="bg-bg-secondary rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-primary">{c.numero}</span>
                      <span className="text-sm text-text-muted">{c.peso} kg</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-text-muted mb-1">
                        <span>Alimento</span><span>{c.nivelAlimento}%</span>
                      </div>
                      <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${c.nivelAlimento}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
