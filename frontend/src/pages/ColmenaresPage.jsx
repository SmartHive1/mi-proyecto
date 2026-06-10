// src/pages/ColmenaresPage.jsx
import { useState } from 'react'
import { Droplets, Weight, Search } from 'lucide-react'
import { colmenares, colmenas } from '../lib/mockData.js'

function ColmenaresPage() {
  const [selectedId, setSelectedId] = useState(colmenares[0].id)
  const [busqueda, setBusqueda] = useState('')

  const colmenarSeleccionado = colmenares.find((c) => c.id === selectedId)
  const colmenasFiltradas = colmenas
    .filter((c) => c.colmenarId === selectedId)
    .filter((c) => c.numero.toLowerCase().includes(busqueda.toLowerCase()))

  function handleCambiarColmenar(id) {
    setSelectedId(id)
    setBusqueda('')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#FFF8ED] text-2xl font-bold">Colmenares</h1>
        <p className="text-[#80756A] text-sm mt-1">Detalle de colmenas por colmenar</p>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {colmenares.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCambiarColmenar(c.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedId === c.id
                ? 'bg-[#F5A623] text-[#1A120B]'
                : 'bg-[#231710] text-[#80756A] border border-[#2A1B13] hover:text-[#FFF8ED] hover:border-[#F5A623]/30'
            }`}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {/* Info colmenar seleccionado */}
      <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#FFF8ED] font-semibold text-lg">{colmenarSeleccionado.nombre}</h2>
            <p className="text-[#80756A] text-sm mt-0.5">{colmenarSeleccionado.ubicacion}</p>
          </div>
          <span className="text-[#F5A623] text-sm font-semibold bg-[#F5A623]/10 px-3 py-1.5 rounded-xl">
            {colmenarSeleccionado.cantidadColmenas} colmenas
          </span>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#80756A]" />
        <input
          type="text"
          placeholder="Buscar colmena por número..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-[#231710] border border-[#2A1B13] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#FFF8ED] placeholder-[#80756A] focus:outline-none focus:border-[#F5A623]/40 transition-colors duration-200"
        />
      </div>

      {/* Lista de colmenas */}
      <div className="space-y-3">
        {colmenasFiltradas.map((colmena) => {
          const nivelColor =
            colmena.nivelAlimento <= 35
              ? '#E53935'
              : colmena.nivelAlimento <= 60
              ? '#F5A623'
              : '#4CAF50'

          return (
            <div key={colmena.id} className="bg-[#231710] border border-[#2A1B13] rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2A1B13] border border-[#3a2a1e] flex items-center justify-center shrink-0">
                    <span className="text-[#F5A623] text-xs font-bold">{colmena.numero}</span>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1.5">
                      <Weight size={14} className="text-[#80756A]" />
                      <span className="text-[#80756A] text-sm">
                        Peso: <span className="text-[#FFF8ED] font-semibold">{colmena.peso} kg</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets size={14} className="text-[#80756A]" />
                      <span className="text-[#80756A] text-sm">
                        Alimento:{' '}
                        <span className="font-semibold" style={{ color: nivelColor }}>
                          {colmena.nivelAlimento}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <div className="h-2 bg-[#1A120B] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${colmena.nivelAlimento}%`, backgroundColor: nivelColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {colmenasFiltradas.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#80756A]">
              {busqueda ? `No se encontraron colmenas con "${busqueda}"` : 'No hay colmenas registradas en este colmenar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ColmenaresPage
