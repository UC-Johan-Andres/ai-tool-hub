export type ToolStatus = "active" | "inactive" | "updating";

export interface ToolAction {
  id: string;
  label: string;
  cmd: string;
  icon: string;
  info: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
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
      { id: "install", label: "Instalar", cmd: "npm i -g @anthropic-ai/claude-code", icon: "Download", info: "Instala Claude Code globalmente usando npm para poder usarlo desde cualquier directorio." },
      { id: "login", label: "Iniciar sesión", cmd: "claude login", icon: "LogIn", info: "Autentica tu cuenta de Anthropic para poder usar Claude Code con tu API key." },
      { id: "start", label: "Iniciar agente", cmd: "claude", icon: "Play", info: "Lanza el agente interactivo de Claude Code en tu terminal para empezar a programar con IA." },
      { id: "mcp", label: "Añadir MCP", cmd: "claude mcp add <nombre> <comando>", icon: "Plug", info: "Conecta un servidor MCP (Model Context Protocol) para extender las capacidades de Claude con herramientas externas." },
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
      { id: "install", label: "Instalar", cmd: "curl -fsSL https://opencode.ai/install | bash", icon: "Download", info: "Descarga e instala OpenCode automáticamente mediante el script oficial." },
      { id: "start", label: "Iniciar", cmd: "opencode", icon: "Play", info: "Inicia el agente de OpenCode en tu terminal para comenzar a trabajar con IA." },
      { id: "config", label: "Configurar", cmd: "opencode config", icon: "Settings", info: "Abre la configuración de OpenCode para ajustar modelo, proveedor y preferencias." },
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
      { id: "install", label: "Instalar", cmd: "pip install aider-chat", icon: "Download", info: "Instala Aider usando pip. Requiere Python 3.10+ instalado en tu sistema." },
      { id: "start", label: "Iniciar", cmd: "aider", icon: "Play", info: "Lanza Aider en el directorio actual para editar archivos con ayuda de IA." },
      { id: "model", label: "Cambiar modelo", cmd: "aider --model <modelo>", icon: "Cpu", info: "Especifica qué modelo LLM usar (ej: gpt-4o, claude-3.5-sonnet, deepseek)." },
      { id: "config", label: "Configurar", cmd: "aider --config", icon: "Settings", info: "Carga configuración desde un archivo YAML para personalizar el comportamiento de Aider." },
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
      { id: "install", label: "Instalar", cmd: "gh extension install github/gh-copilot", icon: "Download", info: "Instala Copilot como extensión de GitHub CLI. Requiere tener gh instalado." },
      { id: "login", label: "Iniciar sesión", cmd: "gh auth login", icon: "LogIn", info: "Autentica tu cuenta de GitHub para acceder a Copilot CLI." },
      { id: "suggest", label: "Sugerir comando", cmd: "gh copilot suggest '<prompt>'", icon: "Lightbulb", info: "Pide a Copilot que sugiera un comando de terminal basado en tu descripción en lenguaje natural." },
      { id: "explain", label: "Explicar comando", cmd: "gh copilot explain '<comando>'", icon: "HelpCircle", info: "Copilot te explica qué hace un comando de terminal paso a paso." },
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
      { id: "install", label: "Instalar", cmd: "npm i -g continue", icon: "Download", info: "Instala Continue globalmente. También puedes instalarlo como extensión del editor." },
      { id: "config", label: "Configurar", cmd: "continue config", icon: "Settings", info: "Abre el archivo de configuración para conectar modelos y personalizar el asistente." },
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
      { id: "install", label: "Instalar", cmd: "npm i -g @openai/codex", icon: "Download", info: "Instala Codex CLI de OpenAI globalmente usando npm." },
      { id: "login", label: "Iniciar sesión", cmd: "codex login", icon: "LogIn", info: "Configura tu API key de OpenAI para autenticarte con el servicio." },
      { id: "start", label: "Iniciar", cmd: "codex", icon: "Play", info: "Lanza el agente Codex en modo interactivo para programar con IA en tu terminal." },
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
      { id: "install", label: "Instalar", cmd: "npm i -g @sourcegraph/cody", icon: "Download", info: "Instala Cody CLI de Sourcegraph para usar el asistente desde terminal." },
      { id: "login", label: "Iniciar sesión", cmd: "cody auth login", icon: "LogIn", info: "Conecta tu cuenta de Sourcegraph para acceder a las funciones de Cody." },
      { id: "chat", label: "Iniciar chat", cmd: "cody chat '<pregunta>'", icon: "MessageSquare", info: "Inicia una conversación con Cody sobre tu código directamente desde la terminal." },
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
      { id: "install", label: "Instalar", cmd: "npm i -g @google/gemini-cli", icon: "Download", info: "Instala Gemini CLI globalmente para usar Google Gemini desde tu terminal." },
      { id: "login", label: "Iniciar sesión", cmd: "gemini auth", icon: "LogIn", info: "Autentica tu cuenta de Google para acceder a la API de Gemini." },
      { id: "start", label: "Iniciar", cmd: "gemini", icon: "Play", info: "Lanza el agente interactivo de Gemini para programar con IA." },
      { id: "mcp", label: "Añadir MCP", cmd: "gemini mcp add <config>", icon: "Plug", info: "Conecta servidores MCP para extender Gemini con herramientas y contexto externo." },
    ],
  },
];
