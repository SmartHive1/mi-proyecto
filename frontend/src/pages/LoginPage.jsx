import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BarChart2, Bell, TrendingUp } from 'lucide-react'
import { useUsuario } from '../contexts/UsuarioContext.jsx'
import BeeIcon from '../components/BeeIcon.jsx'

const USUARIO_TEST = {
  email: 'admin@smarthive.com',
  password: 'SmartHive2024',
  nombre: 'Administrador',
}

const HEX_PATTERN = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='70'%3E%3Cpolygon points='30,2 58,17 58,52 30,67 2,52 2,17' fill='none' stroke='%23F5A623' stroke-width='1'/%3E%3C/svg%3E`

const features = [
  { icon: BarChart2, label: 'Monitoreo en tiempo real' },
  { icon: TrendingUp, label: 'Análisis predictivo' },
  { icon: Bell, label: 'Alertas inteligentes' },
]

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUsuario()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    setCargando(true)

    await new Promise((r) => setTimeout(r, 1200))
    setCargando(false)

    if (email === USUARIO_TEST.email && password === USUARIO_TEST.password) {
      login({ nombre: USUARIO_TEST.nombre, email })
      navigate('/dashboard')
    } else {
      setErrorMsg('Credenciales incorrectas. Intentá de nuevo.')
      setTimeout(() => setErrorMsg(''), 5000)
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#1A120B] overflow-hidden">
      {/* Panel izquierdo */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 bg-[#2A1B13] p-12 relative overflow-hidden"
        style={{ backgroundImage: `url("${HEX_PATTERN}")`, backgroundSize: '60px 70px' }}
      >
        <div className="absolute inset-0 bg-[#2A1B13] opacity-90" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center">
              <BeeIcon className="w-6 h-6 text-[#1A120B]" />
            </div>
            <span className="text-[#F5A623] font-bold text-2xl tracking-tight">Smart Hive</span>
          </div>

          <h1 className="text-[#FFF8ED] text-4xl font-bold leading-tight mb-4">
            Apicultura de<br />
            <span className="text-[#F5A623]">precisión</span>
          </h1>
          <p className="text-[#80756A] text-lg leading-relaxed max-w-md">
            Monitoreo inteligente de colmenas para una apicultura de precisión.
          </p>

          <div className="mt-12 space-y-5">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A120B]/50 border border-[#F5A623]/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#F5A623]" />
                </div>
                <span className="text-[#FFF8ED] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#80756A] text-sm">v1.0.0</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 bg-[#1A120B] overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="bg-[#231710] rounded-2xl p-8 sm:p-10 border border-[#2A1B13]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
                <BeeIcon className="w-5 h-5 text-[#1A120B]" />
              </div>
              <span className="text-[#F5A623] font-bold text-lg">Smart Hive</span>
            </div>

            <h2 className="text-[#FFF8ED] text-2xl font-bold mb-1">Iniciar sesión</h2>
            <p className="text-[#80756A] text-sm mb-8">Accedé al panel de monitoreo de tus colmenas.</p>

            {/* Error */}
            {errorMsg && (
              <div className="mb-6 px-4 py-3 rounded-lg border-l-4 border-[#E53935] bg-[#E53935]/12">
                <p className="text-[#E53935] text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[#80756A] text-xs font-semibold uppercase tracking-widest mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#80756A]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full bg-[#2A1B13] border border-[#3a2a1e] rounded-xl py-3 pl-11 pr-4 text-[#FFF8ED] placeholder-[#4a3a2e] text-sm focus:outline-none focus:border-[#F5A623] transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-[#80756A] text-xs font-semibold uppercase tracking-widest mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#80756A]" />
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#2A1B13] border border-[#3a2a1e] rounded-xl py-3 pl-11 pr-11 text-[#FFF8ED] placeholder-[#4a3a2e] text-sm focus:outline-none focus:border-[#F5A623] transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200"
                  >
                    {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Recordarme */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#3a2a1e] bg-[#2A1B13] accent-[#F5A623]"
                  />
                  <span className="text-[#80756A] text-sm">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="text-[#F5A623] text-sm hover:opacity-80 transition-opacity duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-[#F5A623] text-[#1A120B] font-semibold py-3 rounded-xl text-sm hover:bg-[#f0a020] active:bg-[#e09010] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Verificando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            {/* Credenciales de prueba */}
            <div className="mt-5 p-4 rounded-xl bg-[#2A1B13] border border-[#3a2a1e]">
              <p className="text-[#80756A] text-xs font-semibold uppercase tracking-wider mb-2">Credenciales de prueba</p>
              <p className="text-[#80756A] text-xs">Usuario: <span className="text-[#FFF8ED]/60">admin@smarthive.com</span></p>
              <p className="text-[#80756A] text-xs mt-1">Contraseña: <span className="text-[#FFF8ED]/60">SmartHive2024</span></p>
            </div>

            <p className="text-center text-[#80756A] text-sm mt-6">
              ¿No tenés cuenta?{' '}
              <span className="text-[#F5A623] cursor-pointer hover:opacity-80 transition-opacity duration-200">
                Contactá al administrador
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
