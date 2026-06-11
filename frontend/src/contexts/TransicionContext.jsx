// src/contexts/TransicionContext.jsx
import { createContext, useContext, useState, useRef, useCallback } from 'react'

const TransicionContext = createContext(null)

export function useTransicion() {
  return useContext(TransicionContext)
}

export function TransicionProvider({ children }) {
  const [activa, setActiva] = useState(false)
  const callbackRef = useRef(null)

  // LoginPage llama a esto: dispara la animación y ejecuta cb() cuando termina
  const iniciarTransicion = useCallback((cb) => {
    callbackRef.current = cb
    setActiva(true)
  }, [])

  const terminarTransicion = useCallback(() => {
    setActiva(false)
    callbackRef.current = null
  }, [])

  return (
    <TransicionContext.Provider value={{ activa, iniciarTransicion, terminarTransicion, callbackRef }}>
      {children}
    </TransicionContext.Provider>
  )
}
