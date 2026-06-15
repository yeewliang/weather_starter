# AGENTS.md

Singapore weather tracker: Node/Express backend + React/Vite frontend running as **one process**, storing snapshots for saved coordinates via Drizzle ORM on SQLite.

## Commands

```bash
npm run dev          # Start Express + Vite through Portless → http://weather-starter.localhost:1355
npm run build        # Build frontend and compile backend TypeScript
npm test             # Run all backend tests (vitest, node env)
npm run db:generate  # Regenerate migrations after editing backend/src/schema.ts
npm run db:migrate   # Apply pending migrations to backend/weather.db
npm run reset        # Delete backend/weather.db
npm run doctor       # Smoke-test /health and /api/locations
```

Run a single test file:
```bash
npx vitest run backend/src/routes/locations.test.ts
```

## Core constraints

**Singapore coordinate bounds:** The API rejects coordinates outside `lat 1.1–1.5, lon 103.6–104.1`.

**Snapshot pattern:** Weather is never fetched on page load. `POST /api/locations` creates a record and immediately refreshes it. `POST /api/locations/:id/refresh` overwrites the single stored snapshot. To store history, add a separate readings table.

## Details

- [Backend architecture](docs/agents/backend.md) — server factory, weather client, error handling, API URLs
- [Frontend architecture](docs/agents/frontend.md) — StoreContext, component tree, theming, logging
- [Data layer](docs/agents/data-layer.md) — schema, migrations, JSON columns, CRUD helpers
- [Testing](docs/agents/testing.md) — dependency injection, database isolation, patterns
