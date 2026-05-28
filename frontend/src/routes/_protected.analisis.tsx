import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { produccionMensual, comparativoColmenares, cosechasData } from "@/lib/mock-data";

export const Route = createFileRoute("/_protected/analisis")({
  component: AnalisisPage,
});

const tooltipStyle = { backgroundColor: "#231710", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#FFF8ED" };

function AnalisisPage() {
  const [year, setYear] = useState("2025");

  return (
    <div>
      <PageHeader title="Análisis" subtitle={`Producción y rendimiento – ${year}`} />

      <div className="mb-6">
        <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          {["2023", "2024", "2025"].map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-bg-card rounded-xl p-6 border border-border">
          <h3 className="text-sm font-semibold text-text-muted mb-4">PRODUCCIÓN MENSUAL (KG)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={produccionMensual}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="mes" stroke="#80756A" fontSize={12} />
              <YAxis stroke="#80756A" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="kg" stroke="#F5A623" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bg-card rounded-xl p-6 border border-border">
          <h3 className="text-sm font-semibold text-text-muted mb-4">COMPARATIVO ENTRE COLMENARES</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={comparativoColmenares}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="colmenar" stroke="#80756A" fontSize={12} />
              <YAxis stroke="#80756A" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(245,166,35,0.08)" }} />
              <Bar dataKey="kg" fill="#F5A623" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 bg-bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-secondary text-text-muted">
            <tr>
              <th className="text-left px-4 py-3">Mes</th>
              <th className="text-left px-4 py-3">Colmenar</th>
              <th className="text-left px-4 py-3">Kg cosechados</th>
              <th className="text-left px-4 py-3">Variación</th>
            </tr>
          </thead>
          <tbody>
            {cosechasData.map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-4 py-3">{r.mes}</td>
                <td className="px-4 py-3 text-text-muted">{r.colmenar}</td>
                <td className="px-4 py-3">{r.kg} kg</td>
                <td className={`px-4 py-3 font-semibold ${r.variacion >= 0 ? "text-status-ok" : "text-status-error"}`}>
                  {r.variacion >= 0 ? "+" : ""}{r.variacion}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
