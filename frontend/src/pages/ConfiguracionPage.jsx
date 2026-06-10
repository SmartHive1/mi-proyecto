// src/pages/ConfiguracionPage.jsx
import { useState } from 'react'
import { Save, Bell, User, Lock } from 'lucide-react'
import { useUsuario } from '../contexts/UsuarioContext.jsx'

function Seccion({ titulo, icono: Icono, children }) {
  return (
    <div className="bg-[#231710] border border-[#2A1B13] rounded-2xl p-6 mb-4">
      <div className="flex items-center gap-2 mb-5">
        <Icono size={16} className="text-[#F5A623]" />
        <h2 className="text-[#FFF8ED] font-semibold text-base">{titulo}</h2>
      </div>
      {children}
    </div>
  )
}

function CampoRango({ label, descripcion, value, onChange, min = 0, max = 100, unidad = '%' }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1">
        <label className="text-[#FFF8ED] text-sm font-medium">{label}</label>
        <span className="text-[#F5A623] text-sm font-bold">{value}{unidad}</span>
      </div>
      <p className="text-[#80756A] text-xs mb-2">{descripcion}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#F5A623] cursor-pointer"
      />
      <div className="flex justify-between text-[#80756A] text-xs mt-1">
        <span>{min}{unidad}</span>
        <span>{max}{unidad}</span>
      </div>
    </div>
  )
}

function ConfiguracionPage() {
  const { usuario } = useUsuario()
  const [guardado, setGuardado] = useState(false)

  const [umbrales, setUmbrales] = useState({
    alertaAlimento: 40,
    criticoAlimento: 25,
    alertaPeso: 10,
  })

  const [notifConfig, setNotifConfig] = useState({
    alertasAlimento: true,
    alertasPeso: true,
    alertasSeñal: true,
  })

  function guardar() {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#FFF8ED] text-2xl font-bold">Configuración</h1>
        <p className="text-[#80756A] text-sm mt-1">Ajustes del sistema y alertas</p>
      </div>

      {/* Perfil */}
      <Seccion titulo="Perfil" icono={User}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[#80756A] text-xs mb-1 block">Nombre</label>
            <div className="bg-[#2A1B13] border border-[#3a2a1e] rounded-xl px-4 py-2.5 text-[#FFF8ED] text-sm">
              {usuario?.nombre ?? '—'}
            </div>
          </div>
          <div>
            <label className="text-[#80756A] text-xs mb-1 block">Email</label>
            <div className="bg-[#2A1B13] border border-[#3a2a1e] rounded-xl px-4 py-2.5 text-[#FFF8ED] text-sm">
              {usuario?.email ?? '—'}
            </div>
          </div>
        </div>
        <p className="text-[#80756A] text-xs mt-3">Los datos de perfil se gestionan desde el sistema central.</p>
      </Seccion>

      {/* Umbrales */}
      <Seccion titulo="Umbrales de alerta" icono={Lock}>
        <CampoRango
          label="Alerta de alimento"
          descripcion="Notificar cuando el nivel de alimento baje de este valor"
          value={umbrales.alertaAlimento}
          onChange={(v) => setUmbrales((p) => ({ ...p, alertaAlimento: v }))}
        />
        <CampoRango
          label="Crítico de alimento"
          descripcion="Marcar como crítico cuando el nivel baje de este valor"
          value={umbrales.criticoAlimento}
          onChange={(v) => setUmbrales((p) => ({ ...p, criticoAlimento: v }))}
        />
        <CampoRango
          label="Variación de peso"
          descripcion="Notificar cuando el peso varíe más de este porcentaje en 24hs"
          value={umbrales.alertaPeso}
          onChange={(v) => setUmbrales((p) => ({ ...p, alertaPeso: v }))}
          max={30}
        />
      </Seccion>

      {/* Notificaciones */}
      <Seccion titulo="Notificaciones activas" icono={Bell}>
        <div className="space-y-4">
          {[
            { key: 'alertasAlimento', label: 'Alertas de nivel de alimento', desc: 'Recibir notificaciones cuando el alimento esté bajo' },
            { key: 'alertasPeso', label: 'Alertas de variación de peso', desc: 'Recibir notificaciones ante cambios bruscos de peso' },
            { key: 'alertasSeñal', label: 'Alertas de señal de sensor', desc: 'Recibir notificaciones cuando un sensor pierda señal' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-[#FFF8ED] text-sm font-medium">{label}</p>
                <p className="text-[#80756A] text-xs mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => setNotifConfig((p) => ({ ...p, [key]: !p[key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ml-4 ${
                  notifConfig[key] ? 'bg-[#F5A623]' : 'bg-[#2A1B13] border border-[#3a2a1e]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    notifConfig[key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Seccion>

      {/* Botón guardar */}
      <div className="flex items-center gap-3 justify-end">
        {guardado && (
          <span className="text-[#4CAF50] text-sm font-medium animate-pulse">
            ✓ Cambios guardados
          </span>
        )}
        <button
          onClick={guardar}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#1A120B] rounded-xl text-sm font-semibold hover:bg-[#F5A623]/90 transition-all duration-200"
        >
          <Save size={15} />
          Guardar cambios
        </button>
      </div>
    </div>
  )
}

export default ConfiguracionPage
