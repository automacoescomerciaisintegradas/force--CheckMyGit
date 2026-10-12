# Cloudflare Workers Full-Stack Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/automacoescomerciaisintegradas/force--CheckMyGit)

A production-ready full-stack template for building modern applications on Cloudflare Workers. This template includes a React frontend, Durable Objects for stateful backend logic, and a complete development and deployment workflow.

## Description

This template provides everything needed to build scalable, globally distributed applications using Cloudflare's edge computing platform. It ships with a demo chat application powered by Durable Objects, showcasing real-time entity management, indexing, and API routing.

## Key Features

- **Edge-first Architecture**: Leverages Cloudflare Workers and Durable Objects for low-latency, stateful applications
- **React + Vite Frontend**: Modern UI with Tailwind CSS, shadcn/ui components, and React Router
- **Type-safe Backend**: Hono router with fully typed Durable Object entities
- **Demo Application**: Includes a working chat demo with users, messages, and CRUD operations
- **Developer Experience**: Hot reload, error reporting, theming, and comprehensive TypeScript support

## Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router
- **Backend**: Cloudflare Workers, Hono, Durable Objects (with custom entity/indexing system)
- **Tools**: Bun, Wrangler, ESLint, PostCSS

## Getting Started

### Prerequisites

- Bun (v1.2+)
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

### Development

Start the development server with Vite and Wrangler:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Usage

The template includes:

- A home page with interactive demo (please wait timer + coin system)
- API routes for users and chats under `/api/*`
- Durable Object entities for `User` and `ChatBoard` with automatic seeding and indexing

Extend the project by editing:
- `src/pages/HomePage.tsx` — replace the placeholder UI
- `worker/user-routes.ts` — add or modify API endpoints
- `worker/entities.ts` — define additional Durable Object entities

## Deployment

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/automacoescomerciaisintegradas/force--CheckMyGit)

Deploy to Cloudflare Workers:

```bash
bun run deploy
```

This builds the project and deploys using Wrangler. The wrangler.jsonc configuration includes Durable Object bindings and migrations.

Ensure you have logged in with `wrangler login` before deploying.

## Configuration

- `wrangler.jsonc` — Worker name, assets, Durable Objects, and migrations
- `vite.config.ts` — Vite + Cloudflare plugin setup
- `tailwind.config.js` & `components.json` — UI theming and component aliases

## Contributing

Contributions are welcome. Please open an issue or pull request with clear descriptions of changes. Follow the existing code style and ensure TypeScript checks pass.