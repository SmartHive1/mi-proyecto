import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const [status, setStatus] = useState<"checking" | "ok" | "redirect">("checking");

  useEffect(() => {
    setStatus(getStoredUser() ? "ok" : "redirect");
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-bg-primary" />;
  }
  if (status === "redirect") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen md:flex bg-bg-primary">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
