import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { TrendingUp, Package, Calendar } from 'lucide-react'
import { prediccionesData } from '../lib/mockData.js'

function TooltipPersonalizado({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#231710] border border-[#2A1B13] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-[#80756A] text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value} kg
        </p>
      ))}
    </div>
  )
}

const kgEstimados = prediccionesData.reduce((s, d) => s + d.prediccionActual, 0)
const alimentoNecesario = Math.round(kgEstimados * 0.15)
const mejorMes = prediccionesData.reduce((best, d) =>
  d.prediccionActual > best.prediccionActual ? d : best
)

function PrediccionesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#FFF8ED] text-2xl font-bold">Predicciones</h1>
        <p className="text-[#80756A] text-sm mt-1">Proyección de producción para los próximos 6 meses</p>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
              <TrendingUp size={18} className="text-[#F5A623]" />
            </div>
            <span className="text-[#80756A] text-sm">Kg estimados</span>
          </div>
          <p className="text-[#FFF8ED] text-3xl font-bold">{kgEstimados}</p>
          <p className="text-[#80756A] text-xs mt-1">próximos 6 meses</p>
        </div>

        <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#3AC2FF]/10 flex items-center justify-center">
              <Package size={18} className="text-[#3AC2FF]" />
            </div>
            <span className="text-[#80756A] text-sm">Alimento necesario</span>
          </div>
          <p className="text-[#FFF8ED] text-3xl font-bold">{alimentoNecesario} kg</p>
          <p className="text-[#80756A] text-xs mt-1">estimado requerido</p>
        </div>

        <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
              <Calendar size={18} className="text-[#4CAF50]" />
            </div>
            <span className="text-[#80756A] text-sm">Mejor mes proyectado</span>
          </div>
          <p className="text-[#FFF8ED] text-3xl font-bold">{mejorMes.mes}</p>
          <p className="text-[#80756A] text-xs mt-1">{mejorMes.prediccionActual} kg estimados</p>
        </div>
      </div>

      {/* Gráfico de líneas */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6 mb-6">
        <h2 className="text-[#FFF8ED] font-semibold text-base mb-5">Proyección mensual (kg)</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prediccionesData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A1B13" />
              <XAxis dataKey="mes" tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipPersonalizado />} />
              <Legend
                formatter={(value) =>
                  value === 'prediccionActual' ? 'Predicción actual' : 'Predicción anterior'
                }
                wrapperStyle={{ color: '#80756A', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="prediccionActual"
                stroke="#F5A623"
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={{ fill: '#F5A623', r: 4 }}
                activeDot={{ r: 6 }}
                name="prediccionActual"
              />
              <Line
                type="monotone"
                dataKey="prediccionAnterior"
                stroke="#3AC2FF"
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={{ fill: '#3AC2FF', r: 4 }}
                activeDot={{ r: 6 }}
                name="prediccionAnterior"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6">
        <h2 className="text-[#FFF8ED] font-semibold text-base mb-5">Comparativo predicciones</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prediccionesData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A1B13" />
              <XAxis dataKey="mes" tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipPersonalizado />} />
              <Legend
                formatter={(value) =>
                  value === 'prediccionActual' ? 'Predicción actual' : 'Predicción anterior'
                }
                wrapperStyle={{ color: '#80756A', fontSize: '12px' }}
              />
              <Bar dataKey="prediccionAnterior" fill="#3AC2FF" radius={[3, 3, 0, 0]} name="prediccionAnterior" />
              <Bar dataKey="prediccionActual" fill="#F5A623" radius={[3, 3, 0, 0]} name="prediccionActual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default PrediccionesPage
