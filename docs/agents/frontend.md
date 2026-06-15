# Frontend Architecture

## Component tree

```
App
└── ThemeProvider        (theme/ThemeContext.tsx — CSS class on <html>)
    └── StoreProvider    (state/store.tsx — all data + actions)
        └── Layout
            ├── Sidebar
            │   ├── SidebarCard   (one per location)
            │   └── AddLocationForm
            ├── Hero              (selected location detail view)
            │   ├── HourlyStrip
            │   ├── TenDayForecast
            │   └── TileGrid      (temp, humidity, wind, UV, air quality tiles)
            └── ThemeSelector
```

## State management

All server state lives in a single `StoreContext` (`frontend/src/state/store.tsx`). Components never call `api.ts` directly — they use hooks:

| Hook | Returns |
|---|---|
| `useStore()` | Full store: locations, selectedId, loading flags, actions |
| `useSelectedLocation()` | The currently selected `Location` object or `null` |

Actions available on the store: `create`, `delete`, `refresh`, `select`, `setAdding`.

After `create` or `refresh`, the store re-fetches the full list from the server to stay in sync.

## API layer (`frontend/src/api.ts`)

Thin typed wrappers over `fetch`. All calls use the relative base `/api` — no environment variable, no config needed.

All frontend types (`Location`, `WeatherSnapshot`, `StoreValue`, etc.) live in `frontend/src/types.ts` and mirror the backend's `WeatherSnapshot` interface.

## Theming

Themes are defined in `frontend/src/theme/themes.ts` as `{ id, label, swatch }` objects. The active theme id is stored in `ThemeContext` and applied as a CSS class on `<html>`. Tailwind utility classes drive all visual variants — no CSS-in-JS.

Current themes: `apple`, `midnight`, `desert`, `neon`, `arctic`, `forest`, `golden`, `storm`.

## Interaction logging

Call `logInteraction(event, metadata?)` from `api.ts` for user actions. The `event` name must match `/^[a-z][a-z0-9_.:-]{1,63}$/`. It fires-and-forgets with `keepalive: true`; errors are silently swallowed.

Existing event names (don't duplicate): `location_create_submitted`, `location_created`, `location_create_failed`, `location_refresh_clicked`, `location_refreshed`, `location_refresh_failed`, `location_delete_clicked`, `location_deleted`, `location_delete_failed`, `location_form_opened`.
