import { ToolStatus } from "@/data/tools";
import { cn } from "@/lib/utils";

const statusConfig: Record<ToolStatus, { color: string; label: string }> = {
  active: { color: "bg-tool-active glow-dot", label: "Activo" },
  inactive: { color: "bg-tool-inactive", label: "Inactivo" },
  updating: { color: "bg-tool-warning animate-pulse-glow", label: "Actualizando" },
};

export function StatusDot({ status }: { status: ToolStatus }) {
  const { color, label } = statusConfig[status];
  return (
    <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
      <span className={cn("h-2 w-2 rounded-full", color)} />
      {label}
    </span>
  );
}
