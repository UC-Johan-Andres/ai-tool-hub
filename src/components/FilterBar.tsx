import { cn } from "@/lib/utils";

const filters = [
  { value: "all", label: "Todas" },
  { value: "agent", label: "Agentes" },
  { value: "coding", label: "Coding" },
  { value: "chat", label: "Chat" },
  { value: "utility", label: "Utilidades" },
] as const;

interface FilterBarProps {
  active: string;
  onChange: (v: string) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 pb-6">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "rounded-full px-3.5 py-1.5 font-mono text-xs transition-all",
            active === f.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
