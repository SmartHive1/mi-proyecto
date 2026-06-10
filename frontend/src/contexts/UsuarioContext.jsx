// src/contexts/UsuarioContext.jsx
import { createContext, useContext, useState } from 'react'
import { notificaciones as notificacionesIniciales } from '../lib/mockData.js'

const UsuarioContext = createContext(null)

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('smarthive_usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  const [notificaciones, setNotificaciones] = useState(
    notificacionesIniciales.map((n) => ({ ...n, leida: false }))
  )

  const login = (datosUsuario) => {
    setUsuario(datosUsuario)
    localStorage.setItem('smarthive_usuario', JSON.stringify(datosUsuario))
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('smarthive_usuario')
  }

  const marcarLeida = (id) => {
    setNotificaciones((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)))
  }

  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })))
  }

  const sinLeer = notificaciones.filter((n) => !n.leida).length

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, notificaciones, marcarLeida, marcarTodasLeidas, sinLeer }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export function useUsuario() {
  return useContext(UsuarioContext)
}
