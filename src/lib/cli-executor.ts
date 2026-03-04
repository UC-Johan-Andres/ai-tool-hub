import type { AITool, ToolAction } from "@/data/tools";
import { toast } from "sonner";

export interface CliExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Ejecuta una acción de una herramienta CLI.
 *
 * Intento por orden:
 * 1. Llamar a un backend local `/api/execute` (si existe) para ejecutar el comando.
 * 2. Si falla o no existe, copia el comando al portapapeles como *fallback*.
 */
export async function executeToolAction(
  tool: AITool,
  action: ToolAction,
): Promise<CliExecutionResult | null> {
  const payload = {
    toolId: tool.id,
    actionId: action.id,
    cmd: action.cmd,
  };

  try {
    const res = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = (await res.json()) as CliExecutionResult;

    toast.success(`Acción "${action.label}" ejecutada`, {
      description:
        data.stdout?.slice(0, 120) ||
        (data.exitCode === 0 ? "Comando ejecutado correctamente." : "Comando ejecutado con errores."),
    });

    return data;
  } catch (error) {
    // Fallback: sin backend configurado, seguimos usando el flujo actual de copiar comando.
    try {
      await navigator.clipboard.writeText(action.cmd);
      toast.info("Backend de ejecución no configurado", {
        description: "El comando se ha copiado al portapapeles para que puedas pegarlo en tu terminal.",
      });
    } catch {
      toast.error("No se pudo copiar el comando al portapapeles.");
    }

    return null;
  }
}

