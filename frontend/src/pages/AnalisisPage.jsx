// src/pages/AnalisisPage.jsx
import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { produccionMensual, comparativoData, cosechasData } from '../lib/mockData.js'

const ANIOS = ['2023', '2024', '2025']

function TooltipPersonalizado({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#231710] border border-[#2A1B13] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-[#80756A] text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.value} kg
        </p>
      ))}
    </div>
  )
}

function AnalisisPage() {
  const [anioSeleccionado, setAnioSeleccionado] = useState('2025')
  const [ordenCosechas, setOrdenCosechas] = useState({ campo: null, dir: 'asc' })

  function toggleOrden(campo) {
    setOrdenCosechas((prev) => ({
      campo,
      dir: prev.campo === campo && prev.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  const cosechasOrdenadas = [...cosechasData].sort((a, b) => {
    if (!ordenCosechas.campo) return 0
    const va = a[ordenCosechas.campo]
    const vb = b[ordenCosechas.campo]
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb
    return ordenCosechas.dir === 'asc' ? cmp : -cmp
  })

  function IconOrden({ campo }) {
    if (ordenCosechas.campo !== campo) return <ArrowUpDown size={12} className="ml-1 text-[#3a2a1e]" />
    return ordenCosechas.dir === 'asc'
      ? <ArrowUp size={12} className="ml-1 text-[#F5A623]" />
      : <ArrowDown size={12} className="ml-1 text-[#F5A623]" />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#FFF8ED] text-2xl font-bold">Análisis</h1>
        <p className="text-[#80756A] text-sm mt-1">Producción y comparativa por colmenar</p>
      </div>

      {/* Producción mensual */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6 mb-6">
        <h2 className="text-[#FFF8ED] font-semibold text-base mb-5">Producción mensual (kg)</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={produccionMensual} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A1B13" />
              <XAxis dataKey="mes" tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipPersonalizado />} />
              <Area
                type="monotone"
                dataKey="kg"
                stroke="#F5A623"
                strokeWidth={2}
                fill="url(#areaGrad)"
                dot={{ fill: '#F5A623', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparativo — ahora el filtro de año realmente funciona */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#FFF8ED] font-semibold text-base">Comparativo por colmenar</h2>
          <div className="flex gap-1.5">
            {ANIOS.map((anio) => (
              <button
                key={anio}
                onClick={() => setAnioSeleccionado(anio)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  anioSeleccionado === anio
                    ? 'bg-[#F5A623] text-[#1A120B]'
                    : 'bg-[#2A1B13] text-[#80756A] hover:text-[#FFF8ED]'
                }`}
              >
                {anio}
              </button>
            ))}
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativoData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A1B13" />
              <XAxis dataKey="colmenar" tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#80756A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipPersonalizado />} />
              <Bar dataKey={anioSeleccionado} fill="#F5A623" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla cosechas — ahora con ordenamiento */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A1B13]">
          <h2 className="text-[#FFF8ED] font-semibold text-base">Detalle de cosechas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A1B13]">
                {[
                  { label: 'Mes', campo: 'mes' },
                  { label: 'Colmenar', campo: 'colmenar' },
                  { label: 'Kg cosechados', campo: 'kg' },
                  { label: 'Variación', campo: 'variacion' },
                ].map(({ label, campo }) => (
                  <th
                    key={campo}
                    onClick={() => toggleOrden(campo)}
                    className="text-left px-6 py-3 text-[#80756A] text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-[#FFF8ED] transition-colors duration-150 select-none"
                  >
                    <span className="flex items-center">
                      {label}
                      <IconOrden campo={campo} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cosechasOrdenadas.map((fila, i) => (
                <tr key={i} className="border-b border-[#2A1B13]/50 hover:bg-[#2A1B13]/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-[#FFF8ED] text-sm font-medium">{fila.mes}</td>
                  <td className="px-6 py-4 text-[#80756A] text-sm">{fila.colmenar}</td>
                  <td className="px-6 py-4 text-[#FFF8ED] text-sm font-semibold">{fila.kg} kg</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${fila.variacion >= 0 ? 'text-[#4CAF50]' : 'text-[#E53935]'}`}>
                      {fila.variacion >= 0 ? '+' : ''}{fila.variacion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnalisisPage
