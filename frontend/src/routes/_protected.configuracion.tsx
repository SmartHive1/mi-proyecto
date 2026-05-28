import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_protected/configuracion")({
  component: ConfiguracionPage,
});

function ConfiguracionPage() {
  return (
    <div>
      <PageHeader title="Configuración" />
      <div className="bg-bg-card rounded-xl p-12 border border-border text-center">
        <p className="text-text-muted">Próximamente disponible.</p>
      </div>
    </div>
  );
}
