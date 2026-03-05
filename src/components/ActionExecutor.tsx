import { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { icons, Copy, Play } from "lucide-react";
import { toast } from "sonner";
import type { AITool, ToolAction } from "@/data/tools";
import { executeToolAction } from "@/lib/cli-executor";

function buildCommand(cmd: string, params: { id: string }[], values: Record<string, string>): string {
  return params.reduce((result, param) => {
    const value = values[param.id]?.trim();
    if (!value) return result;
    return result.split(`{${param.id}}`).join(value);
  }, cmd);
}

interface ActionExecutorProps {
  tool: AITool;
  action: ToolAction;
  children: (props: { onClick: () => void }) => React.ReactNode;
}

export function ActionExecutor({ tool, action, children }: ActionExecutorProps) {
  const params = action.params ?? [];
  const hasParams = params.length > 0;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const finalCmd = useMemo(
    () => (hasParams ? buildCommand(action.cmd, params, values) : action.cmd),
    [action.cmd, params, values, hasParams],
  );

  const allRequiredFilled = params
    .filter((p) => p.required)
    .every((p) => (values[p.id] ?? "").trim().length > 0);

  const handleClick = useCallback(() => {
    if (hasParams) {
      setValues({});
      setOpen(true);
    } else {
      executeToolAction(tool, action);
    }
  }, [hasParams, tool, action]);

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
            {params.map((param, i) => (
              <div key={param.id} className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">
                  {param.label}
                  {param.required && <span className="ml-1 text-destructive">*</span>}
                </label>
                <Input
                  type={param.type === "password" ? "password" : "text"}
                  placeholder={param.placeholder}
                  value={values[param.id] ?? ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [param.id]: e.target.value }))}
                  className="h-9 font-mono text-xs"
                  autoFocus={i === 0}
                />
              </div>
            ))}

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
              disabled={!allRequiredFilled}
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
