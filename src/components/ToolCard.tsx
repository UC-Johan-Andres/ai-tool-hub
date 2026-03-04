import { AITool } from "@/data/tools";
import { StatusDot } from "./StatusDot";
import { icons } from "lucide-react";
import { motion } from "framer-motion";
import { Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ToolCardProps {
  tool: AITool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = icons[tool.icon as keyof typeof icons];

  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    toast.success("Comando copiado");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group flex flex-col rounded-lg border border-border bg-card transition-colors hover:border-primary/30"
    >
      {/* Main row */}
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
          {IconComponent && <IconComponent size={20} className="text-primary" />}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold leading-none">{tool.name}</h3>
              <span className="font-mono text-[11px] text-muted-foreground">v{tool.version}</span>
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">{tool.description}</p>
          </div>

          <span className="hidden shrink-0 rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
            {tool.category}
          </span>

          <StatusDot status={tool.status} />

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink size={14} />
          </a>

          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded actions */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border"
        >
          <div className="grid gap-2 px-5 py-4 sm:grid-cols-2">
            {tool.actions.map((action) => {
              const ActionIcon = icons[action.icon as keyof typeof icons];
              return (
                <div
                  key={action.id}
                  className="flex items-center gap-3 rounded-md bg-secondary/50 px-3 py-2.5 transition-colors hover:bg-secondary"
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
                  <button
                    onClick={() => copyCmd(action.cmd)}
                    className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                    title="Copiar comando"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
