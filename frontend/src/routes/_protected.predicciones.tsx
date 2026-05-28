import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { prediccionFutura, prediccionesData } from "@/lib/mock-data";

export const Route = createFileRoute("/_protected/predicciones")({
  component: PrediccionesPage,
});

const tooltipStyle = { backgroundColor: "#231710", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#FFF8ED" };

function PrediccionesPage() {
  return (
    <div>
      <PageHeader title="Predicciones" subtitle="Proyección de producción y necesidades para los próximos 6 meses." />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Kg estimados", value: "1.073 kg" },
          { label: "Alimento necesario", value: "180 kg" },
          { label: "Mejor mes proyectado", value: "Abril" },
        ].map((c) => (
          <div key={c.label} className="bg-bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wider">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-primary">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-bg-card rounded-xl p-6 border border-border">
          <h3 className="text-sm font-semibold text-text-muted mb-4">PRÓXIMOS 6 MESES (KG)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={prediccionFutura}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="mes" stroke="#80756A" fontSize={12} />
              <YAxis stroke="#80756A" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="kg" stroke="#3AC2FF" strokeWidth={2} strokeDasharray="6 4" dot={{ fill: "#3AC2FF", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bg-card rounded-xl p-6 border border-border">
          <h3 className="text-sm font-semibold text-text-muted mb-4">REAL VS PREDICCIÓN</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={prediccionesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="mes" stroke="#80756A" fontSize={12} />
              <YAxis stroke="#80756A" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(245,166,35,0.06)" }} />
              <Legend wrapperStyle={{ color: "#80756A", fontSize: 12 }} />
              <Bar dataKey="real" name="Real" fill="#F5A623" radius={[4, 4, 0, 0]} />
              <Bar dataKey="prediccionAnterior" name="Predicción anterior" fill="#80756A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="prediccionActual" name="Predicción actual" fill="#3AC2FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
