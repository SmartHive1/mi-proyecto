import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ColmenaresPage from './pages/ColmenaresPage.jsx'
import AnalisisPage from './pages/AnalisisPage.jsx'
import PrediccionesPage from './pages/PrediccionesPage.jsx'
import NotificacionesPage from './pages/NotificacionesPage.jsx'
import ConfiguracionPage from './pages/ConfiguracionPage.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <Layout>
              <DashboardPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/colmenares"
        element={
          <RutaProtegida>
            <Layout>
              <ColmenaresPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/analisis"
        element={
          <RutaProtegida>
            <Layout>
              <AnalisisPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/predicciones"
        element={
          <RutaProtegida>
            <Layout>
              <PrediccionesPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/notificaciones"
        element={
          <RutaProtegida>
            <Layout>
              <NotificacionesPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/configuracion"
        element={
          <RutaProtegida>
            <Layout>
              <ConfiguracionPage />
            </Layout>
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
