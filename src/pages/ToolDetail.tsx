import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { tools } from "@/data/tools";
import { StatusDot } from "@/components/StatusDot";
import { icons, Info } from "lucide-react";
import { executeToolAction } from "@/lib/cli-executor";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";


interface ToolLogEntry {
  id: string;
  actionId: string;
  cmd: string;
  status: "success" | "error";
  timestamp: string;
  summary: string;
}

const mockLogs: ToolLogEntry[] = [
  {
    id: "1",
    actionId: "start",
    cmd: "claude",
    status: "success",
    timestamp: new Date().toISOString(),
    summary: "Sesión iniciada correctamente",
  },
  {
    id: "2",
    actionId: "config",
    cmd: "aider --config",
    status: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    summary: "Error al cargar configuración (archivo no encontrado)",
  },
];

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();

  const tool = useMemo(() => tools.find((t) => t.id === id), [id]);

  const logsForTool = useMemo(
    () => mockLogs.filter((entry) => entry.cmd.includes(tool?.id ?? "")),
    [tool],
  );

  if (!tool) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm text-muted-foreground">
            No se encontró la herramienta solicitada.
          </p>
          <Link to="/" className="text-sm text-primary underline">
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = icons[tool.icon as keyof typeof icons];

  const handleExecute = async (actionId: string) => {
    const action = tool.actions.find((a) => a.id === actionId);
    if (!action) {
      toast.error("Acción no encontrada");
      return;
    }
    await executeToolAction(tool, action);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              {IconComponent && <IconComponent size={24} className="text-primary" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{tool.name}</h1>
                <span className="font-mono text-xs text-muted-foreground">v{tool.version}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono uppercase tracking-wider text-muted-foreground">
                  {tool.category}
                </span>
                <StatusDot status={tool.status} />
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Documentación oficial
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-xs">
            <Link
              to="/"
              className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-secondary"
            >
              Volver al dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Acciones disponibles</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Ejecuta acciones directamente desde el hub. Si no hay backend configurado, el comando se
              copiará al portapapeles.
            </p>
            <div className="flex flex-col gap-2">
              {tool.actions.map((action) => {
                const ActionIcon = icons[action.icon as keyof typeof icons];
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleExecute(action.id)}
                    className="flex items-center gap-3 rounded-md bg-secondary/50 px-3 py-2.5 text-left text-xs transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-background">
                      {ActionIcon && <ActionIcon size={14} className="text-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium text-foreground">{action.label}</span>
                      <code className="mt-0.5 block truncate font-mono text-[10px] text-muted-foreground">
                        $ {action.cmd}
                      </code>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="shrink-0 cursor-help rounded p-1 text-muted-foreground transition-colors hover:text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Info size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-[240px] text-xs">
                        {action.info}
                      </TooltipContent>
                    </Tooltip>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex min-h-[220px] flex-col rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold">Log de la herramienta</h2>
                <p className="text-xs text-muted-foreground">
                  Historial reciente de ejecuciones y acciones.
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto px-4 py-3 text-xs font-mono">
                {logsForTool.length === 0 ? (
                  <p className="text-muted-foreground">
                    Aún no hay registros para esta herramienta. Cuando conectes un backend podrás ver aquí
                    el historial real.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {logsForTool.map((entry) => (
                      <li key={entry.id} className="rounded-md bg-secondary/40 px-3 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
                              entry.status === "success"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {entry.status}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-foreground">{entry.summary}</p>
                        <code className="mt-1 block truncate text-[10px] text-muted-foreground">
                          $ {entry.cmd}
                        </code>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;

