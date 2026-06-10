import { useState } from 'react'
import Navbar from './Navbar.jsx'
import BeeIcon from '../BeeIcon.jsx'
import { Menu } from 'lucide-react'

function Layout({ children }) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const [sidebarColapsado, setSidebarColapsado] = useState(false)

  return (
    <div className="relative flex h-screen bg-[#1A120B] overflow-hidden">
      <Navbar
        sidebarAbierto={sidebarAbierto}
        setSidebarAbierto={setSidebarAbierto}
        sidebarColapsado={sidebarColapsado}
        setSidebarColapsado={setSidebarColapsado}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header mobile — ahora dentro de la columna de contenido, no en el flex horizontal */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#2A1B13] border-b border-[#231710] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F5A623] flex items-center justify-center">
              <BeeIcon className="w-4 h-4 text-[#1A120B]" />
            </div>
            <span className="text-[#F5A623] font-bold text-base">Smart Hive</span>
          </div>
          <button
            onClick={() => setSidebarAbierto(true)}
            className="text-[#80756A] hover:text-[#FFF8ED] transition-colors duration-200"
          >
            <Menu size={22} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
