# Data Layer

## Schema changes workflow

1. Edit `backend/src/schema.ts`
2. `npm run db:generate` — writes new SQL migration file to `backend/drizzle/`
3. `npm run db:migrate` — applies it to `backend/weather.db`

Never edit the generated files in `backend/drizzle/` by hand.

## JSON columns

`forecast_periods` and `daily_forecast` are stored as JSON text in SQLite. In the Drizzle schema they use `{ mode: 'json' }` with `.$type<T>()` for TypeScript safety. Always initialise them as empty arrays `[]`, never `null`.

## CRUD helpers (`backend/src/db.ts`)

`db.ts` runs migrations automatically on import via top-level `await`. Do not import it before setting `DATABASE_PATH` in tests.

The helpers bridge the camelCase Drizzle columns and the snake_case `WeatherSnapshot`/`LocationRecord` interface via two internal functions:

- `weatherToColumns(snapshot)` — maps snapshot → DB column object for insert/update
- `rowToRecord(row)` — maps DB row → `LocationRecord` (the shape the API returns)

Always go through these helpers when reading or writing weather data — never construct column objects inline.

## Coordinate uniqueness

`(latitude, longitude)` has a unique index. `createLocation` checks for duplicates and throws `new Error('Location already exists')` with `error.name = 'DuplicateLocationError'` before hitting the DB constraint.
