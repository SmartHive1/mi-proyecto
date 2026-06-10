import { useState } from 'react'
import { MapPin, ArrowLeft, Droplets, Weight } from 'lucide-react'
import { colmenares, colmenas } from '../lib/mockData.js'

function ColmenarCard({ item, alClick }) {
  return (
    <button
      onClick={alClick}
      className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6 text-left hover:border-[#F5A623]/40 hover:bg-[#2A1B13] transition-all duration-200 group w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors duration-200">
          <svg viewBox="0 0 24 24" fill="#F5A623" className="w-7 h-7">
            <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6 5.2 5 5.5 4.5 6.5C4 7.5 4.5 8.7 5.5 9.2C5.2 10 5.2 10.8 5.5 11.5L3 14l2 1-2 2 3-1c.8 1.2 2 2.1 3.5 2.5L9 21h1.5l.5-2h2l.5 2H15l-.5-2.5c1.5-.4 2.7-1.3 3.5-2.5l3 1-2-2 2-1-2.5-2.5c.3-.7.3-1.5 0-2.3 1-.5 1.5-1.7 1-2.7C19 4.5 18 4.2 17 4.5 16.5 3.5 14.5 2 12 2z" />
          </svg>
        </div>
        <span className="text-[#F5A623] text-sm font-semibold bg-[#F5A623]/10 px-3 py-1 rounded-lg">
          {item.cantidadColmenas} colmenas
        </span>
      </div>
      <h3 className="text-[#FFF8ED] font-semibold text-lg mb-2">{item.nombre}</h3>
      <div className="flex items-center gap-1.5 text-[#80756A] text-sm">
        <MapPin size={13} />
        <span>{item.ubicacion}</span>
      </div>
    </button>
  )
}

function ColmenaDetalle({ colmena }) {
  const nivelColor =
    colmena.nivelAlimento <= 35
      ? '#E53935'
      : colmena.nivelAlimento <= 60
      ? '#F5A623'
      : '#4CAF50'

  return (
    <div className="bg-[#2A1B13] border border-[#3a2a1e] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#FFF8ED] font-semibold text-base">{colmena.numero}</span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{ color: nivelColor, backgroundColor: `${nivelColor}18` }}
        >
          {colmena.nivelAlimento}% alimento
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Weight size={14} className="text-[#80756A]" />
          <div>
            <p className="text-[#80756A] text-xs">Peso</p>
            <p className="text-[#FFF8ED] text-sm font-semibold">{colmena.peso} kg</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets size={14} className="text-[#80756A]" />
          <div>
            <p className="text-[#80756A] text-xs">Alimento</p>
            <p className="text-[#FFF8ED] text-sm font-semibold">{colmena.nivelAlimento}%</p>
          </div>
        </div>
      </div>

      <div className="h-2 bg-[#1A120B] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${colmena.nivelAlimento}%`, backgroundColor: nivelColor }}
        />
      </div>
    </div>
  )
}

function DashboardPage() {
  const [colmenarSeleccionado, setColmenarSeleccionado] = useState(null)

  const colmenasDelSeleccionado = colmenarSeleccionado
    ? colmenas.filter((c) => c.colmenarId === colmenarSeleccionado.id)
    : []

  if (colmenarSeleccionado) {
    return (
      <div>
        <button
          onClick={() => setColmenarSeleccionado(null)}
          className="flex items-center gap-2 text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200 mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Volver
        </button>

        <div className="mb-6">
          <h1 className="text-[#FFF8ED] text-2xl font-bold">{colmenarSeleccionado.nombre}</h1>
          <div className="flex items-center gap-1.5 text-[#80756A] text-sm mt-1">
            <MapPin size={13} />
            <span>{colmenarSeleccionado.ubicacion}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colmenasDelSeleccionado.map((c) => (
            <ColmenaDetalle key={c.id} colmena={c} />
          ))}
        </div>

        {colmenasDelSeleccionado.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#80756A] text-base">No hay colmenas registradas en este colmenar.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#FFF8ED] text-2xl font-bold">Dashboard</h1>
        <p className="text-[#80756A] text-sm mt-1">Resumen general de todos tus colmenares</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Colmenares', valor: colmenares.length },
          { label: 'Total colmenas', valor: colmenas.length },
          { label: 'Alertas activas', valor: 2, destacado: true },
          { label: 'Sensores online', valor: `${colmenas.length - 1}/${colmenas.length}` },
        ].map(({ label, valor, destacado }) => (
          <div key={label} className="bg-[#231710] border border-[#2A1B13] rounded-xl p-4">
            <p className="text-[#80756A] text-xs mb-1">{label}</p>
            <p className={`text-2xl font-bold ${destacado ? 'text-[#E53935]' : 'text-[#FFF8ED]'}`}>
              {valor}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-[#FFF8ED] text-lg font-semibold">Colmenares</h2>
        <p className="text-[#80756A] text-sm mt-0.5">Hacé click para ver el detalle de cada colmenar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {colmenares.map((item) => (
          <ColmenarCard key={item.id} item={item} alClick={() => setColmenarSeleccionado(item)} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
