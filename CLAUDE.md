# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint across the project
- `docker compose up --build` — Build and run via Docker (serves on port 3000)

## Architecture

React 19 + Vite 7 SPA with a bulletin board (게시판) CRUD application. Uses React Router v7 for client-side routing with BrowserRouter. No backend — all data is persisted in localStorage.

### Routing (src/App.jsx)

| Path | Page |
|---|---|
| `/` | Redirects to `/board` |
| `/board` | Board list with pagination |
| `/board/create` | Create new post |
| `/board/edit/:id` | Edit existing post |
| `/board/:id` | Post detail view |

### Layer Structure

- **Pages** (`src/pages/board/`) — Route-level components that wire together services and presentational components. Each page uses React Router hooks (`useParams`, `useNavigate`, `useSearchParams`) for routing logic.
- **Components** (`src/components/board/`) — Presentational components (`BoardTable`, `BoardForm`, `BoardDetail`, `Pagination`). `BoardForm` is shared between create and edit pages via `initialData` prop.
- **Services** (`src/services/boardService.js`) — Data layer using localStorage. Exports `getPosts`, `getPostById`, `createPost`, `updatePost`, `deletePost`. Seeds 23 mock posts on first load.

### Key Conventions

- UI language is Korean.
- ESLint: flat config (`eslint.config.js`) with `react-hooks` and `react-refresh` plugins. Unused vars starting with uppercase or `_` are allowed.
- JSX files use `.jsx` extension (not TypeScript).
- Pagination uses a configurable page group size (default 5) and 10 items per page.

### Deployment

Multi-stage Docker build: Node 20 Alpine builds the app, then nginx Alpine serves the static files. The nginx config has `try_files` fallback to `index.html` for SPA routing.
