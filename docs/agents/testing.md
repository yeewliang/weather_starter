# Testing

## Stack

Vitest with `pool: 'forks'` and `fileParallelism: false` (required because tests share a SQLite file path process-level). Tests run in Node environment — no browser/jsdom.

All test files match `backend/src/**/*.test.ts`.

## Dependency injection

`createApp` accepts options to make tests hermetic:

```ts
const app = await createApp({
  serveFrontend: false,       // skip Vite middleware
  enableRequestLogging: false, // suppress pino-http output
  weatherClient: {
    async getCurrentWeather() { return myFixtureSnapshot; },
  },
});
```

`WeatherClient` is a single-method interface — any object with `getCurrentWeather(lat, lon): Promise<WeatherSnapshot>` works.

## Database isolation

Set `DATABASE_PATH` to a temp file **before** importing `server.ts` (which imports `db.ts`, which runs migrations on import):

```ts
beforeAll(async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'weather-test-'));
  process.env.DATABASE_PATH = join(tempDir, 'weather.db');
  // import AFTER setting the env var
  const { createApp } = await import('../server.js');
  app = await createApp({ ... });
});

afterAll(async () => {
  await rm(tempDir, { recursive: true, force: true });
});
```

## Running tests

```bash
npm test                                                    # full suite
npx vitest run backend/src/routes/locations.test.ts        # single file
npm run test:watch                                          # watch mode
```
