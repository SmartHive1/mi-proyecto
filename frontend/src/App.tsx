import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ColmenaresPage from './pages/ColmenaresPage';
import AnalisisPage from './pages/AnalisisPage';
import PrediccionesPage from './pages/PrediccionesPage';
import NotificacionesPage from './pages/NotificacionesPage';
import ConfiguracionPage from './pages/ConfiguracionPage';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/colmenares"
          element={
            <ProtectedLayout>
              <ColmenaresPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/analisis"
          element={
            <ProtectedLayout>
              <AnalisisPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/predicciones"
          element={
            <ProtectedLayout>
              <PrediccionesPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/notificaciones"
          element={
            <ProtectedLayout>
              <NotificacionesPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/configuracion"
          element={
            <ProtectedLayout>
              <ConfiguracionPage />
            </ProtectedLayout>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
