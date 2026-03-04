import { TerminalSquare } from "lucide-react";
import { tools } from "@/data/tools";

export function DashboardHeader() {
  const activeCount = tools.filter((t) => t.status === "active").length;

  return (
    <header className="flex flex-col gap-1 pb-8">
      <div className="flex items-center gap-3">
        <TerminalSquare size={28} className="text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">AI CLI Tools</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-mono text-primary">{activeCount}</span> herramientas activas de{" "}
        <span className="font-mono">{tools.length}</span> disponibles
      </p>
    </header>
  );
}
