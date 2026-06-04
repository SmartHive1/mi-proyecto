import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Boxes, BarChart3, TrendingUp, Bell, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/colmenares", label: "Colmenares", icon: Boxes },
  { to: "/analisis", label: "Análisis", icon: BarChart3 },
  { to: "/predicciones", label: "Predicciones", icon: TrendingUp },
  { to: "/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/configuracion", label: "Configuración", icon: Settings },
] as const;

function BeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a3 3 0 00-2.83 2H8a2 2 0 100 4h.34A6 6 0 006 13.5C6 17.64 8.69 21 12 21s6-3.36 6-7.5A6 6 0 0015.66 8H16a2 2 0 100-4h-1.17A3 3 0 0012 2zm-3 11h6a4 4 0 01-6 0z" />
    </svg>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Topbar mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-border sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <BeeIcon className="w-6 h-6 text-primary" />
          <span className="font-bold text-primary">Smart Hive</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-text-primary p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside
        className={`${open ? "block" : "hidden"} md:flex md:sticky md:top-0 fixed md:static inset-0 z-20 md:z-auto md:h-screen md:w-64 w-full bg-bg-secondary border-r border-border flex-col`}
      >
        <div className="p-6 hidden md:flex items-center gap-2">
          <BeeIcon className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-primary">Smart Hive</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-text-primary hover:bg-bg-card"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-bg-card"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

export { BeeIcon };