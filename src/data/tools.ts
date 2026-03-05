export type ToolStatus = "active" | "inactive" | "updating";

export interface ToolAction {
  id: string;
  label: string;
  cmd: string;
  icon: string; // lucide icon name
  info: string; // descripción de qué hace la acción
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  version: string;
  status: ToolStatus;
  category: "coding" | "chat" | "agent" | "utility";
  url: string;
  actions: ToolAction[];
}

export const tools: AITool[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Agente de código de Anthropic para terminal",
    icon: "Sparkles",
    version: "1.0.3",
    status: "active",
    category: "agent",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    actions: [
      { id: "install", label: "Instalar", cmd: "npm i -g @anthropic-ai/claude-code", icon: "Download" },
      { id: "login", label: "Iniciar sesión", cmd: "claude login", icon: "LogIn" },
      { id: "start", label: "Iniciar agente", cmd: "claude", icon: "Play" },
      { id: "mcp", label: "Añadir MCP", cmd: "claude mcp add <nombre> <comando>", icon: "Plug" },
    ],
  },
  {
    id: "opencode",
    name: "OpenCode",
    description: "Terminal AI coding agent open source",
    icon: "Code2",
    version: "0.5.2",
    status: "active",
    category: "agent",
    url: "https://opencode.ai",
    actions: [
      { id: "install", label: "Instalar", cmd: "curl -fsSL https://opencode.ai/install | bash", icon: "Download" },
      { id: "start", label: "Iniciar", cmd: "opencode", icon: "Play" },
      { id: "config", label: "Configurar", cmd: "opencode config", icon: "Settings" },
    ],
  },
  {
    id: "aider",
    name: "Aider",
    description: "AI pair programming en tu terminal",
    icon: "GitBranch",
    version: "0.82.0",
    status: "active",
    category: "coding",
    url: "https://aider.chat",
    actions: [
      { id: "install", label: "Instalar", cmd: "pip install aider-chat", icon: "Download" },
      { id: "start", label: "Iniciar", cmd: "aider", icon: "Play" },
      { id: "model", label: "Cambiar modelo", cmd: "aider --model <modelo>", icon: "Cpu" },
      { id: "config", label: "Configurar", cmd: "aider --config", icon: "Settings" },
    ],
  },
  {
    id: "github-copilot-cli",
    name: "Copilot CLI",
    description: "GitHub Copilot para la línea de comandos",
    icon: "Terminal",
    version: "1.0.5",
    status: "inactive",
    category: "utility",
    url: "https://github.com/github/gh-copilot",
    actions: [
      { id: "install", label: "Instalar", cmd: "gh extension install github/gh-copilot", icon: "Download" },
      { id: "login", label: "Iniciar sesión", cmd: "gh auth login", icon: "LogIn" },
      { id: "suggest", label: "Sugerir comando", cmd: "gh copilot suggest '<prompt>'", icon: "Lightbulb" },
      { id: "explain", label: "Explicar comando", cmd: "gh copilot explain '<comando>'", icon: "HelpCircle" },
    ],
  },
  {
    id: "continue",
    name: "Continue",
    description: "Asistente AI open source para VS Code y JetBrains",
    icon: "Workflow",
    version: "0.9.1",
    status: "active",
    category: "coding",
    url: "https://continue.dev",
    actions: [
      { id: "install", label: "Instalar", cmd: "npm i -g continue", icon: "Download" },
      { id: "config", label: "Configurar", cmd: "continue config", icon: "Settings" },
    ],
  },
  {
    id: "codex-cli",
    name: "Codex CLI",
    description: "Agente de código de OpenAI para terminal",
    icon: "Cpu",
    version: "0.1.0",
    status: "updating",
    category: "agent",
    url: "https://github.com/openai/codex",
    actions: [
      { id: "install", label: "Instalar", cmd: "npm i -g @openai/codex", icon: "Download" },
      { id: "login", label: "Iniciar sesión", cmd: "codex login", icon: "LogIn" },
      { id: "start", label: "Iniciar", cmd: "codex", icon: "Play" },
    ],
  },
  {
    id: "cody",
    name: "Cody",
    description: "AI coding assistant de Sourcegraph",
    icon: "Search",
    version: "5.4.0",
    status: "inactive",
    category: "chat",
    url: "https://sourcegraph.com/cody",
    actions: [
      { id: "install", label: "Instalar", cmd: "npm i -g @sourcegraph/cody", icon: "Download" },
      { id: "login", label: "Iniciar sesión", cmd: "cody auth login", icon: "LogIn" },
      { id: "chat", label: "Iniciar chat", cmd: "cody chat '<pregunta>'", icon: "MessageSquare" },
    ],
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    description: "Google Gemini desde tu terminal",
    icon: "Zap",
    version: "0.3.1",
    status: "active",
    category: "agent",
    url: "https://github.com/google-gemini/gemini-cli",
    actions: [
      { id: "install", label: "Instalar", cmd: "npm i -g @google/gemini-cli", icon: "Download" },
      { id: "login", label: "Iniciar sesión", cmd: "gemini auth", icon: "LogIn" },
      { id: "start", label: "Iniciar", cmd: "gemini", icon: "Play" },
      { id: "mcp", label: "Añadir MCP", cmd: "gemini mcp add <config>", icon: "Plug" },
    ],
  },
];
