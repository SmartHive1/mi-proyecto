import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, BarChart3, FlaskConical, BellRing, Loader2 } from "lucide-react";
import { login, getStoredUser } from "@/lib/auth";
import { BeeIcon } from "@/components/Sidebar";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Smart Hive" },
      { name: "description", content: "Accedé a tu panel de Smart Hive." },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (getStoredUser()) setRedirect(true);
  }, []);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  if (redirect) return <Navigate to="/dashboard" />;

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const res = await login(values.email, values.password);
    if (res.success) navigate({ to: "/dashboard" });
    else setError(res.error);
  };

  return (
    <div className="min-h-screen flex bg-bg-primary text-text-primary">
      {/* Left panel */}
      <div className="hidden md:flex w-1/2 relative bg-bg-secondary p-12 flex-col justify-between overflow-hidden">
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hex" width="56" height="49" patternUnits="userSpaceOnUse">
              <polygon points="28,1 54,15 54,42 28,56 2,42 2,15" fill="none" stroke="#F5A623" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        <div className="relative">
          <div className="flex items-center gap-3">
            <BeeIcon className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold text-primary">Smart Hive</span>
          </div>
          <p className="mt-8 text-lg text-text-primary max-w-md leading-relaxed">
            Monitoreo inteligente de colmenas para una apicultura de precisión.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              { icon: BarChart3, text: "Monitoreo en tiempo real" },
              { icon: FlaskConical, text: "Análisis predictivo" },
              { icon: BellRing, text: "Alertas inteligentes" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-bg-card flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <span className="text-text-primary">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <span className="relative text-xs text-text-muted">v1.0.0</span>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-bg-primary">
        <div className="w-full max-w-[420px] bg-bg-card rounded-2xl p-10 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <BeeIcon className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary">Smart Hive</span>
          </div>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-sm text-text-muted mt-1">Ingresá tus credenciales para acceder al panel.</p>

          {error && (
            <div
              className="mt-5 rounded-md p-3 text-sm border-l-[3px]"
              style={{ backgroundColor: "rgba(229,57,53,0.12)", borderLeftColor: "#E53935", color: "#FFF8ED" }}
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider text-text-muted">CORREO ELECTRÓNICO</label>
              <div className="mt-1.5 relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-status-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-text-muted">CONTRASEÑA</label>
              <div className="mt-1.5 relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-status-error">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-muted cursor-pointer">
                <input type="checkbox" className="accent-[color:var(--primary)]" {...register("remember")} />
                Recordarme
              </label>
              <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Validando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-5 rounded-lg p-3 text-xs bg-bg-secondary text-text-muted">
            <div><span className="font-semibold">Usuario:</span> admin@smarthive.com</div>
            <div><span className="font-semibold">Contraseña:</span> SmartHive2024</div>
          </div>

          <p className="mt-6 text-center text-sm text-text-muted">
            ¿No tenés cuenta? <span className="text-primary">Contactá al administrador</span>
          </p>
        </div>
      </div>
    </div>
  );
}
