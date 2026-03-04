export type ToolStatus = "active" | "inactive" | "updating";

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  installCmd: string;
  version: string;
  status: ToolStatus;
  category: "coding" | "chat" | "agent" | "utility";
  url: string;
}

export const tools: AITool[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Agente de código de Anthropic para terminal",
    icon: "Sparkles",
    installCmd: "npm i -g @anthropic-ai/claude-code",
    version: "1.0.3",
    status: "active",
    category: "agent",
    url: "https://docs.anthropic.com/en/docs/claude-code",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description: "Terminal AI coding agent open source",
    icon: "Code2",
    installCmd: "curl -fsSL https://opencode.ai/install | bash",
    version: "0.5.2",
    status: "active",
    category: "agent",
    url: "https://opencode.ai",
  },
  {
    id: "aider",
    name: "Aider",
    description: "AI pair programming en tu terminal",
    icon: "GitBranch",
    installCmd: "pip install aider-chat",
    version: "0.82.0",
    status: "active",
    category: "coding",
    url: "https://aider.chat",
  },
  {
    id: "github-copilot-cli",
    name: "Copilot CLI",
    description: "GitHub Copilot para la línea de comandos",
    icon: "Terminal",
    installCmd: "gh extension install github/gh-copilot",
    version: "1.0.5",
    status: "inactive",
    category: "utility",
    url: "https://github.com/github/gh-copilot",
  },
  {
    id: "continue",
    name: "Continue",
    description: "Asistente AI open source para VS Code y JetBrains",
    icon: "Workflow",
    installCmd: "npm i -g continue",
    version: "0.9.1",
    status: "active",
    category: "coding",
    url: "https://continue.dev",
  },
  {
    id: "codex-cli",
    name: "Codex CLI",
    description: "Agente de código de OpenAI para terminal",
    icon: "Cpu",
    installCmd: "npm i -g @openai/codex",
    version: "0.1.0",
    status: "updating",
    category: "agent",
    url: "https://github.com/openai/codex",
  },
  {
    id: "cody",
    name: "Cody",
    description: "AI coding assistant de Sourcegraph",
    icon: "Search",
    installCmd: "npm i -g @sourcegraph/cody",
    version: "5.4.0",
    status: "inactive",
    category: "chat",
    url: "https://sourcegraph.com/cody",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    description: "Google Gemini desde tu terminal",
    icon: "Zap",
    installCmd: "npm i -g @google/gemini-cli",
    version: "0.3.1",
    status: "active",
    category: "agent",
    url: "https://github.com/google-gemini/gemini-cli",
  },
];
