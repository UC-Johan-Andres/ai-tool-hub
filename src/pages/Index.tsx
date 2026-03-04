import { useState } from "react";
import { tools } from "@/data/tools";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FilterBar } from "@/components/FilterBar";
import { ToolCard } from "@/components/ToolCard";

const Index = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? tools : tools.filter((t) => t.category === filter);

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <DashboardHeader />
        <FilterBar active={filter} onChange={setFilter} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
