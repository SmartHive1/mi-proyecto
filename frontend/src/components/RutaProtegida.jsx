import { Navigate } from 'react-router-dom'
import { useUsuario } from '../contexts/UsuarioContext.jsx'

function RutaProtegida({ children }) {
  const { usuario } = useUsuario()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaProtegida
