import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext(null)

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('smarthive_usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  const login = (datosUsuario) => {
    setUsuario(datosUsuario)
    localStorage.setItem('smarthive_usuario', JSON.stringify(datosUsuario))
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('smarthive_usuario')
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export function useUsuario() {
  return useContext(UsuarioContext)
}
