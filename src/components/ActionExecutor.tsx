import { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { icons, Copy, Play } from "lucide-react";
import { toast } from "sonner";
import type { AITool, ToolAction } from "@/data/tools";
import { executeToolAction } from "@/lib/cli-executor";

/** Extracts <placeholder> tokens from a command string */
function extractPlaceholders(cmd: string): string[] {
  const matches = cmd.match(/<[^>]+>/g);
  return matches ? [...new Set(matches)] : [];
}

function buildCommand(cmd: string, values: Record<string, string>): string {
  let result = cmd;
  for (const [placeholder, value] of Object.entries(values)) {
    result = result.replaceAll(placeholder, value);
  }
  return result;
}

interface ActionExecutorProps {
  tool: AITool;
  action: ToolAction;
  children: (props: { onClick: () => void }) => React.ReactNode;
}

export function ActionExecutor({ tool, action, children }: ActionExecutorProps) {
  const placeholders = useMemo(() => extractPlaceholders(action.cmd), [action.cmd]);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const hasPlaceholders = placeholders.length > 0;

  const finalCmd = useMemo(
    () => (hasPlaceholders ? buildCommand(action.cmd, values) : action.cmd),
    [action.cmd, values, hasPlaceholders],
  );

  const allFilled = placeholders.every((p) => (values[p] ?? "").trim().length > 0);

  const handleClick = useCallback(() => {
    if (hasPlaceholders) {
      setValues({});
      setOpen(true);
    } else {
      executeToolAction(tool, action);
    }
  }, [hasPlaceholders, tool, action]);

  const handleExecute = async () => {
    const resolvedAction = { ...action, cmd: finalCmd };
    await executeToolAction(tool, resolvedAction);
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalCmd);
    toast.success("Comando copiado");
  };

  return (
    <>
      {children({ onClick: handleClick })}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-semibold">
              {(() => {
                const Icon = icons[action.icon as keyof typeof icons];
                return Icon ? <Icon size={16} className="text-primary" /> : null;
              })()}
              {action.label}
            </DialogTitle>
            <p className="text-xs text-muted-foreground">{action.info}</p>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2">
            {placeholders.map((placeholder) => {
              const label = placeholder.replace(/[<>]/g, "");
              return (
                <div key={placeholder} className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted-foreground">{label}</label>
                  <Input
                    placeholder={`Ingresa ${label}...`}
                    value={values[placeholder] ?? ""}
                    onChange={(e) => setValues((prev) => ({ ...prev, [placeholder]: e.target.value }))}
                    className="h-9 font-mono text-xs"
                    autoFocus={placeholders.indexOf(placeholder) === 0}
                  />
                </div>
              );
            })}

            {/* Live preview */}
            <div className="rounded-md bg-secondary/60 px-3 py-2">
              <span className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
                Comando resultante
              </span>
              <code className="block break-all font-mono text-xs text-foreground">$ {finalCmd}</code>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary"
            >
              <Copy size={12} /> Copiar
            </button>
            <button
              type="button"
              disabled={!allFilled}
              onClick={handleExecute}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              <Play size={12} /> Ejecutar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
