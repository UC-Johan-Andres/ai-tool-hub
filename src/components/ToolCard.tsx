import { AITool } from "@/data/tools";
import { StatusDot } from "./StatusDot";
import { icons } from "lucide-react";
import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ToolCardProps {
  tool: AITool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const IconComponent = icons[tool.icon as keyof typeof icons];

  const copyCmd = () => {
    navigator.clipboard.writeText(tool.installCmd);
    toast.success("Comando copiado");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-tool-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
            {IconComponent && <IconComponent size={20} className="text-primary" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">{tool.name}</h3>
            <span className="font-mono text-[11px] text-muted-foreground">v{tool.version}</span>
          </div>
        </div>
        <StatusDot status={tool.status} />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-muted-foreground">{tool.description}</p>

      {/* Install command */}
      <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
        <code className="flex-1 truncate font-mono text-[11px] text-secondary-foreground">
          $ {tool.installCmd}
        </code>
        <button
          onClick={copyCmd}
          className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
        >
          <Copy size={14} />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {tool.category}
        </span>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Docs <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}
