## Visión general del proyecto

Este documento describe la **estructura**, **flujo**, **diseño** y **objetivo** del proyecto `ai-tool-hub`.

- **Tipo de proyecto**: Aplicación de página única (SPA) de **frontend**.
- **Stack principal**: **React 18 + TypeScript** con **Vite** como bundler y servidor de desarrollo.
- **Dominio funcional**: Panel o _hub_ de **herramientas de línea de comando para IA (AI CLI tools)**.
- **Arquitectura**: Monolito frontend, sin backend en este repositorio.

---

## Estructura de carpetas

En la raíz del proyecto se encuentran principalmente:

- `package.json`: scripts (`dev`, `build`, `preview`, `test`, `lint`) y dependencias.
- `bun.lockb` / `package-lock.json`: archivos de bloqueo de dependencias.
- `vite.config.ts`: configuración de Vite (bundler/dev server).
- `vitest.config.ts`: configuración de Vitest (testing).
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: configuración de TypeScript.
- `tailwind.config.ts`: configuración de Tailwind CSS.
- `postcss.config.js`: configuración de PostCSS (incluye `autoprefixer`).
- `eslint.config.js`: configuración de ESLint (flat config).
- `components.json`: configuración de shadcn-ui.
- `index.html`: documento HTML base que carga el bundle (`/src/main.tsx`).
- `public/`: recursos estáticos (por ejemplo `robots.txt`).

Carpeta principal de código:

- `src/`
  - `main.tsx`: punto de entrada de React.
  - `App.tsx`: componente raíz y composición de *providers* y routing.
  - `pages/`
    - `Index.tsx`: página principal (dashboard de herramientas AI CLI).
    - `NotFound.tsx`: página 404.
  - `components/`
    - Componentes de dominio: `DashboardHeader.tsx`, `FilterBar.tsx`, `ToolCard.tsx`, `StatusDot.tsx`, `NavLink.tsx`, etc.
    - `components/ui/`: librería de componentes reutilizables generados con shadcn-ui (botones, inputs, diálogos, menús, toasts, etc.).
  - `data/`
    - `tools.ts`: definición del tipo `AITool` y lista estática de herramientas AI CLI.
  - `hooks/`
    - Hooks compartidos como `use-mobile`, `use-toast`, etc.
  - `lib/`
    - `utils.ts`: utilidades compartidas (por ejemplo, helper `cn` para clases CSS).
  - `test/`
    - `setup.ts`: configuración global de pruebas.
    - `example.test.ts`: ejemplo de test con Vitest.
  - Estilos
    - `index.css`, `App.css`: estilos globales y específicos de la app.

---

## Tecnologías y librerías clave

- **Frontend / UI**
  - **React 18** + **TypeScript**.
  - **React Router DOM** para el routing de la SPA.
  - **Tailwind CSS** + `tailwindcss-animate` para estilos utilitarios y animaciones.
  - **shadcn-ui** y **Radix UI** (`@radix-ui/react-*`) como sistema de componentes accesibles y reutilizables.
  - **Lucide React** (`lucide-react`) para iconos.
  - **Framer Motion** para animaciones en algunos componentes.
  - **Recharts** (preparado para gráficos a través de componentes en `components/ui/chart.tsx`).

- **Gestión de datos/estado en cliente**
  - **@tanstack/react-query**: disponible para gestión de datos asíncronos; en el estado actual del proyecto los datos principales son estáticos (no hay llamadas HTTP).

- **Build / Dev server**
  - **Vite** con plugin **React SWC** (`@vitejs/plugin-react-swc`) para compilación rápida.

- **Testing**
  - **Vitest** como framework de tests.
  - **Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`) + **jsdom** para pruebas de componentes React.

- **Calidad y estilo de código**
  - **ESLint 9** con flat config (`eslint.config.js`), usando:
    - `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

---

## Flujo principal de la aplicación

1. **Carga del HTML base**
   - El navegador carga `index.html`, donde se declara `<div id="root"></div>` y se importa el módulo `src/main.tsx`.

2. **Bootstrap de React**
   - `src/main.tsx`:
     - Importa `App` e `index.css`.
     - Monta el árbol de React en `#root` usando `createRoot`.

3. **Componente raíz y proveedores**
   - `src/App.tsx`:
     - Crea un `QueryClient` de React Query.
     - Envuelve la aplicación en:
       - `QueryClientProvider` (estado de datos asíncronos).
       - `TooltipProvider` (tooltips globales).
       - Sistema de toasts de shadcn (`Toaster`) y de `sonner`.
       - `BrowserRouter` de `react-router-dom`.
     - Define las rutas:
       - `/` → `Index`.
       - `*` → `NotFound`.

4. **Página principal: dashboard de herramientas AI**
   - `src/pages/Index.tsx`:
     - Importa el listado de herramientas desde `src/data/tools.ts`.
     - Mantiene en estado local un filtro de categoría:
       - `"all" | "agent" | "coding" | "chat" | "utility"`.
     - Calcula una lista filtrada de herramientas en memoria (sin peticiones HTTP).
     - Renderiza:
       - `DashboardHeader`: título, descripción y métricas básicas (por ejemplo, herramientas activas vs totales).
       - `FilterBar`: botones para cambiar el filtro de categoría.
       - Una cuadrícula/lista de `ToolCard`, una por herramienta.

5. **Interacción del usuario**
   - El usuario puede:
     - Cambiar de categoría con `FilterBar` (se actualiza el estado en `Index`).
     - Expandir/colapsar cada `ToolCard` para ver más detalles.
     - Copiar comandos CLI asociados a cada herramienta; internamente se usa `navigator.clipboard.writeText` y se muestra un toast de éxito.
   - La navegación entre rutas se maneja con `react-router-dom`.

---

## Patrones de diseño y arquitectura

- **Arquitectura general**
  - **Monolito frontend SPA**: todo el código vive en `src/`, no se incluye backend en este repositorio.
  - No es un monorepo; no hay carpetas `apps/` ni `packages/`.

- **Organización por capas**
  - **Presentación genérica** (`components/ui/`):
    - Componentes reutilizables basados en shadcn-ui y Radix (botones, inputs, menús, formularios, etc.).
  - **Presentación de dominio** (`components/`):
    - Componentes específicos del dominio “AI CLI tools”: `DashboardHeader`, `FilterBar`, `ToolCard`, `StatusDot`, etc.
  - **Páginas** (`pages/`):
    - Vistas de alto nivel que combinan componentes y definen el flujo del usuario (`Index`, `NotFound`).
  - **Datos de dominio** (`data/`):
    - `tools.ts` centraliza el tipo `AITool` y el listado estático de herramientas.
  - **Infraestructura y utilidades** (`lib/`, `hooks/`):
    - Helpers como `cn` y hooks reutilizables para funcionalidades transversales (toasts, mobile, etc.).

- **Patrones específicos**
  - **Componentización fuerte**: la UI se compone de muchos componentes pequeños y enfocados.
  - **Composition Root** en `App.tsx`: allí se agregan todos los providers globales (React Query, tooltips, toasts, router).
  - **Alias de imports**:
    - Configurados en `tsconfig*.json` y `vite.config.ts` para permitir imports como `@/components`, `@/data`, `@/lib`, `@/hooks`.

---

## Configuración, ejecución y despliegue

- **Ejecución local**
  - Requisitos: Node.js y npm instalados.
  - Pasos típicos:
    - `npm install`
    - `npm run dev` (inicia el servidor de desarrollo de Vite).
  - Scripts disponibles:
    - `npm run dev` → desarrollo.
    - `npm run build` → build de producción.
    - `npm run build:dev` → build en modo desarrollo.
    - `npm run preview` → previsualización del build.
    - `npm run test` / `npm run test:watch` → ejecutar tests con Vitest.
    - `npm run lint` → análisis estático con ESLint.

- **Configuración de Vite**
  - Definida en `vite.config.ts`.
  - Servidor de desarrollo:
    - `host: "::"` (escucha en todas las interfaces IPv6).
    - `port: 8080`.
    - HMR con `overlay` de errores desactivado.
  - Plugins:
    - `@vitejs/plugin-react-swc`.
    - `lovable-tagger` en modo desarrollo.

- **Configuración de Tailwind**
  - Definida en `tailwind.config.ts`.
  - `darkMode: ["class"]`.
  - `content`: incluye `./src/**/*.{ts,tsx}` y rutas relacionadas.
  - Tema extendido con una paleta de colores personalizada (`tool`, `sidebar`, etc.) y varias animaciones.

- **Testing**
  - Definido en `vitest.config.ts`.
  - Entorno `jsdom` con `globals: true`.
  - Archivos de test: `src/**/*.{test,spec}.{ts,tsx}`.
  - Setup global en `src/test/setup.ts`.

- **CI / Docker / variables de entorno**
  - En el estado actual:
    - No hay `.env` comprometidos en el repositorio.
    - No hay `Dockerfile` ni `docker-compose`.
    - No hay configuración de CI específica (`.github/workflows`, etc.).
  - El despliegue se sugiere a través de la plataforma **Lovable** (según `README.md`).

---

## Objetivo de la aplicación y posibles extensiones

- **Objetivo actual**
  - Servir como **hub centralizado** para:
    - Descubrir herramientas de IA que se usan por línea de comando.
    - Ver su estado, categoría y comandos de instalación/uso.
    - Copiar rápidamente dichos comandos para ejecutarlos en la terminal.
  - Ofrecer una **UI moderna y consistente** basada en un sistema de diseño extensible.

- **Posibles extensiones futuras**
  - Añadir **búsqueda por texto** sobre nombre, descripción o tags de cada herramienta.
  - Sustituir el listado estático de `tools.ts` por datos obtenidos de una **API** o de un backend.
  - Incorporar **nuevas páginas** (por ejemplo, detalle de herramienta, página de favoritos, comparativas).
  - Añadir **métricas y gráficos** de uso usando los componentes de `Recharts`.
  - Integrar **autenticación** para que cada usuario pueda guardar su propia colección de herramientas favoritas.

