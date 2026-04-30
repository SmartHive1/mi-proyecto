import { useState, useEffect } from 'react'

function App() {
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    fetch('/api/hola/')
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje))
  }, [])

  return (
    <div>
      <h1>{mensaje}</h1>
    </div>
  )
}

export default App