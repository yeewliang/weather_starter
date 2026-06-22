# Backend Architecture

## Request flow

```
Browser → Portless proxy → Express+Vite (random local port)
                               ├── /api/*  → locations router → SQLite (backend/weather.db)
                               │                                    ↕ Drizzle ORM
                               └── /*      → Vite SPA (dev: Vite middleware, prod: static dist)
                                                    ↕ relative /api calls
                                            data.gov.sg external API
```

Express and Vite share one process. The frontend uses relative `/api` paths — there is no cross-origin config and no frontend dev port to configure.

## Key files (`backend/src/`)

| File                  | Role                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------ |
| `server.ts`           | `createApp(options)` factory — wires Express, Pino HTTP logging, and Vite middleware |
| `routes/locations.ts` | All location CRUD + refresh endpoints; exports `WeatherClient` interface             |
| `weather.ts`          | `SingaporeWeatherClient` — external API client                                       |
| `schema.ts`           | Drizzle table definition                                                             |
| `db.ts`               | SQLite connection, auto-migration on import, typed CRUD helpers                      |
| `logger.ts`           | Pino logger instance                                                                 |

## Weather client

`SingaporeWeatherClient.getCurrentWeather(lat, lon)` fires **10 parallel requests** via `Promise.allSettled`. Partial failures are tolerated — failed readings return `null` fields on the snapshot rather than throwing.

**Two base URLs:**

- Most endpoints: `https://api-open.data.gov.sg` (v2, JSON `data.items` shape)
- 4-day forecast: `https://api.data.gov.sg` (v1, JSON `items` shape — different nesting)

**Nearest-location matching:** Uses squared Euclidean distance (not haversine) to find the closest forecast area, weather station, or air quality region to a lat/lon pair.

## Error handling contract

`WeatherProviderError` is the typed class for all external API failures.

| Endpoint                          | On `WeatherProviderError`                                     |
| --------------------------------- | ------------------------------------------------------------- |
| `POST /api/locations`             | Logs a warning, still returns `201` with placeholder snapshot |
| `POST /api/locations/:id/refresh` | Returns `502`                                                 |

Duplicate coordinates throw an `Error` with `name === 'DuplicateLocationError'` → `409`.

## Logging

Structured Pino logger via `backend/src/logger.ts`. Request logging (pino-http) is disabled in test (`NODE_ENV=test`).

Frontend interactions POST to `/api/logs` with an `event` string matching `/^[a-z][a-z0-9_.:-]{1,63}$/`. Invalid events return `422`.
