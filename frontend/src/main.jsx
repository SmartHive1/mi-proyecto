import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UsuarioProvider } from './contexts/UsuarioContext.jsx'
import { TransicionProvider } from './contexts/TransicionContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <TransicionProvider>
          <App />
        </TransicionProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </React.StrictMode>
)
