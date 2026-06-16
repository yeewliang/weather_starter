# Weather Starter — Theme Reference

This document catalogues every visual theme discussed for Weather Starter: the ones already implemented and the ones proposed but not yet built. Each entry includes the theme ID (where applicable), a short description, and the key design decisions for colour, typography, card styling, and layout density.

---

## Implemented themes

These themes are live in the selector (`src/theme/themes.ts`) and fully styled via `[data-theme='…']` overrides in `frontend/src/index.css`. New themes follow the same CSS-only pattern — no component changes are needed.

---

### 1. Apple (`id: apple`) — *default*
**The original design.** Steel-blue glassmorphism on a muted blue-grey gradient — the familiar iOS Weather aesthetic.

| Dimension | Value |
|---|---|
| Background | `radial-gradient` blue-grey blooms over `linear-gradient(#6f8aa8 → #3c5066)` |
| Font | System UI sans-serif (no override) |
| Card style | Frosted white glass (`bg-white/8`), `border-white/15`, `rounded-2xl`, `backdrop-blur-xl` |
| Card density | Medium — generous padding, comfortable line spacing |
| Accent | Sky-blue temperature bar gradient (`sky-300 → amber-300 → orange-300`) |

---

### 2. Midnight Cosmos (`id: midnight`)
**Deep space for night owls.** Near-black base lit by indigo and neon-cyan radial glows.

| Dimension | Value |
|---|---|
| Background | `#0a0a1a` base; indigo bloom top-right, cyan aurora bottom-left |
| Font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) 300–700 |
| Card style | Dark navy glass (`rgba(8,8,28,…)`), cyan-tinted borders with subtle outer glow |
| Card density | Spacious — large temperature readout, breathing room |
| Accent | Neon-cyan `rgba(34,211,238,…)` for borders, scrollbar, focus ring, and dividers |

**Design notes:** All `border-white/*` and `bg-white/*` Tailwind classes are overridden to cyan-tinted dark equivalents. The selected sidebar card uses a cyan wash (`rgba(34,211,238,0.12)`) instead of white.

---

### 3. Desert Dusk (`id: desert`)
**Warm sunset palette.** Burnt sienna → deep amber, editorial serif typography.

| Dimension | Value |
|---|---|
| Background | `#2c1008` ember base; amber bloom top-right, deep sienna glow bottom-left |
| Font | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) 400–900 |
| Card style | Warm amber glass (`rgba(255,180,100,…)`), cream `rgba(210,140,70,…)` borders, warm drop shadow |
| Card density | Medium — generous padding with editorial spacing |
| Accent | Warm amber `rgba(210,140,70,…)` for borders, selected card wash, scrollbar |

**Design notes:** The serif headings on large temperature and area-name text feel print-editorial, like a luxury travel magazine's weather section.

---

### 4. Neon Forecast (`id: neon`)
**Cyberpunk / synthwave.** Pitch black, hot pink + electric purple, glowing card borders.

| Dimension | Value |
|---|---|
| Background | `#020106` near-black; hot-pink bloom top-right, electric-purple glow bottom-left |
| Font | [Orbitron](https://fonts.google.com/specimen/Orbitron) 400–900 (display), falls back to `Courier New` |
| Card style | Near-black `rgba(15,0,30,…)`, hot-pink borders with 14 px diffuse outer glow + inset glow |
| Card density | Compact — information-dense, HUD-like |
| Accent | Hot pink `rgba(247,37,133,…)` — borders, selected card wash, scrollbar, neon focus ring |

**Design notes:** `border-white/30` (selected card border) gets an extra-strong 20 px glow. The `Orbitron` font makes temperatures and location names feel like cockpit instruments.

---

### 5. Arctic Minimal (`id: arctic`)
**Scandinavian minimalism.** Clean white/ice-blue light theme, charcoal text, hairline borders.

| Dimension | Value |
|---|---|
| Background | `#f0f9ff` ice-blue base; soft blue radial blooms — no darkness at all |
| Font | [DM Sans](https://fonts.google.com/specimen/DM+Sans) 300–600 |
| Card style | Near-opaque white glass (`rgba(255,255,255,0.80–0.88)`), hairline dark borders (`rgba(0,0,0,0.10)`), soft drop shadow |
| Card density | Very spacious — lots of whitespace, large touch targets |
| Accent | Sky-blue `rgba(14,165,233,…)` — selected card border, submit button, scrollbar, focus ring |

**Design notes:** This is a full light-theme polarity flip. Every `text-white/*` Tailwind class is remapped to `rgba(30,41,59,…)` (slate-800) at the matching opacity. The submit button (`bg-white/90`) is remapped to sky-blue to prevent white-on-white invisibility. Error text `text-red-100` is remapped to `red-700` for readability.

---

### 6. Earthy Forest (`id: forest`)
**Grounded in nature.** Deep olive-green base, warm cream accents, literary serif.

| Dimension | Value |
|---|---|
| Background | `#14220f` dark olive base; lime-green highlight top-right, dark forest bloom bottom-left |
| Font | [Lora](https://fonts.google.com/specimen/Lora) 400–700 (slab serif) |
| Card style | Matte dark forest-green `rgba(30,55,25,…)` panels, warm cream borders `rgba(210,200,160,…)` |
| Card density | Medium — cozy, readable, not crowded |
| Accent | Mossy green `rgba(134,179,96,…)` — selected card wash, hover states, scrollbar, focus ring |

**Design notes:** The matte (non-glass) card feel comes from using an opaque green base colour with no significant blur contribution. Lora's slab serifs lend warmth and readability at small sizes compared with display serifs.

---

### 7. Golden Hour (`id: golden`)
**Photography-inspired luxury.** Deep amber-black, real-gold shimmer borders, elegant display serif.

| Dimension | Value |
|---|---|
| Background | `#241402` amber-black base; gold radial bloom top-right, warm sienna ember bottom-left |
| Font | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) 300–700 (high-contrast display serif) |
| Card style | Translucent amber glass `rgba(80,50,8,…)`, gold shimmer borders `rgba(212,175,55,…)` with inset highlight + warm drop shadow |
| Card density | Airy — editorial spacing, the large temperature is the hero element |
| Accent | Gold `rgba(212,175,55,…)` throughout — borders, selected card, scrollbar, focus ring |

**Design notes:** Cormorant Garamond's extreme stroke contrast makes it stunning at 6.5 rem (the hero temperature size) and surprisingly legible at caption sizes. The inset `box-shadow` on main cards creates a subtle inner shimmer suggesting a gold foil edge.

---

### 8. Rainstorm (`id: storm`)
**Moody and data-forward.** Dark charcoal-teal, sharp card corners, teal left-border accent stripe.

| Dimension | Value |
|---|---|
| Background | `#0b1518` charcoal-teal base; cool slate-blue bloom top-right, saturated teal pool bottom-left |
| Font | [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) 300–600 (slightly condensed, technical) |
| Card style | Charcoal-teal glass `rgba(15,40,50,…)`, teal borders; **all `rounded-2xl` cards become `border-radius: 4px` with a 3 px solid teal left-border stripe** |
| Card density | Compact — data-dense; the angular cards reinforce the no-nonsense feel |
| Accent | Cool teal `rgba(56,178,172,…)` — stripe, borders, selected card, scrollbar, focus ring |

**Design notes:** The signature move is overriding `.rounded-2xl` globally to `border-radius: 4px` + `border-left: 3px solid teal`. This makes every panel look like a terminal or log-viewer block rather than a soft bubble. IBM Plex Sans was designed for data interfaces (IBM Watson, developer tools) and reads well at small sizes in tabular weather data.

---

### 9. Pastel Studio (`id: pastel`)
**Soft, approachable, playful.** Off-white background with lilac/peach/mint pastel blooms, rounded Nunito.

| Dimension | Value |
|---|---|
| Background | `#fdf4ff` near-white base; soft lilac bloom top-right, peach-pink glow bottom-left, mint hint at centre |
| Font | [Nunito](https://fonts.google.com/specimen/Nunito) 300–800 (rounded geometric sans) |
| Card style | Near-opaque white `rgba(255,255,255,0.80–0.88)`, soft lilac borders `rgba(139,92,246,…)`, gentle purple shadow |
| Card density | Medium — playful spacing; the rounded font softens everything |
| Accent | Soft lilac / violet `rgba(139,92,246,…)` — borders, selected card, submit button, scrollbar, focus ring |

**Design notes:** Second light-theme polarity flip. Text is remapped to deep violet `rgba(45,32,64,…)` rather than plain black — a more cohesive colour story. The submit button (`bg-white/90`) becomes violet to stay visible. Error text `text-red-100` becomes `rose-800`.

---

### 10. Terminal Green (`id: terminal`)
**Retro hacker aesthetic.** Phosphor-green on pitch black, `Fira Code` monospaced exclusively.

| Dimension | Value |
|---|---|
| Background | Pure `#000000` base; faint phosphor-green radial bloom at centre; CSS scanline overlay (`repeating-linear-gradient`) |
| Font | [Fira Code](https://fonts.google.com/specimen/Fira+Code) 300–700 (monospace) |
| Card style | Near-black `rgba(0,20,8,…)` panels, `rgba(0,255,65,0.30)` borders; sharp corners (`border-radius: 0`) |
| Card density | Dense — monospaced font and zero rounding give a terminal / log-viewer feel |
| Accent | Phosphor green `#00ff41` — all text, borders, selected card wash, submit button, scrollbar, focus ring |

**Design notes:** All `text-white/*` classes are remapped to phosphor green at matching opacity steps. The submit button background becomes `rgba(0,200,50,0.90)` with black text for legibility. Error text uses bright `#ff4444` for contrast on black. The scanline overlay is a very-low-opacity repeating gradient on the body — purely decorative, adds CRT authenticity.

---

## Proposed themes (not yet implemented)

These were designed in the initial brainstorming session. Each can be added by following the same pattern: add an entry to `themes.ts`, add a Google Font link if needed, and write a `[data-theme='X']` block in `index.css`.

---

### 11. Ocean Depth
**Deep-sea blues with bioluminescent accents.** Deep navy, glowing aqua data values, `Syne` bold headings.

| Dimension | Intended value |
|---|---|
| Background | `#0d1b2a` deep navy base; glowing aqua bloom |
| Font | [Syne](https://fonts.google.com/specimen/Syne) bold headings, [Inter](https://fonts.google.com/specimen/Inter) body |
| Card style | Navy glass, aqua inner glow on selected card |
| Card density | Medium-spacious |
| Accent | Aqua `rgba(0,230,200,…)` |

---

### 12. Paper Map
**Cartographic, vintage travel-journal.** Aged parchment, sepia, dark ink, `Crimson Pro` serif + `Courier Prime` data values.

| Dimension | Intended value |
|---|---|
| Background | Aged parchment `#f5ead0`; subtle noise/grain texture overlay |
| Font | [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) (headings), [Courier Prime](https://fonts.google.com/specimen/Courier+Prime) (numbers) |
| Card style | Flat parchment squares, hand-drawn-style border (`border-dashed` or SVG border image) |
| Card density | Medium — textured, unhurried |
| Accent | Sepia ink `#5c4a1e` |

**Design notes:** A full light-theme flip is required (like Arctic / Pastel). The map tile's CARTO dark basemap should ideally be switched to CARTO light (`carto.com/light_all`) — requires a component change.

---

### 13. High Contrast Accessible
**WCAG AAA-compliant.** Pure black/white, yellow accent, no gradients, `Atkinson Hyperlegible`, large base size.

| Dimension | Intended value |
|---|---|
| Background | Pure `#000000` — no gradient |
| Font | [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible) — designed specifically for low-vision readers |
| Card style | Black with `2px solid white` borders; no glass, no blur, no gradient |
| Card density | Spacious — 18 px base font size, large touch targets |
| Accent | Yellow `#ffe135` for interactive elements only |

**Design notes:** Requires removing `backdrop-blur-xl` overrides and disabling the `bg-gradient-to-r` temperature bar in `TenDayForecast`. Focus rings should be `3px solid #ffe135` for maximum visibility.

---

### 14. Luxury Dark
**Premium, app-store-feature-worthy.** Near-black with champagne-gold accents, noise texture, `Canela`-style display type.

| Dimension | Intended value |
|---|---|
| Background | `#111` with subtle grain/noise CSS texture; single gold radial glow |
| Font | [Fraunces](https://fonts.google.com/specimen/Fraunces) or [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) display; [Helvetica Neue](https://fonts.google.com/specimen/Work+Sans) body |
| Card style | Dark obsidian `rgba(20,15,10,…)`, thin gold `rgba(201,160,76,…)` borders, deep inner shadow |
| Card density | Airy — the large temperature number is the only hero; everything else recedes |
| Accent | Champagne gold `#c9a04c` |

---

### 15. Kawaii Pastel
**Cute and playful — weather icons are the star.** Candy colours on white, `Nunito` extra-bold, chunky rounded corners, emoji-friendly.

| Dimension | Intended value |
|---|---|
| Background | White `#ffffff`; candy-pink and sky-blue soft blooms |
| Font | [Nunito](https://fonts.google.com/specimen/Nunito) 800–900 (chunky, rounded) |
| Card style | White with thick `3px` coloured borders that change colour per weather condition (sun = yellow, rain = blue, cloud = grey) |
| Card density | Loose — large icon sizing, emoji-friendly label sizes |
| Accent | Condition-dependent: amber (sun), sky (cloud/rain), pink (default) |

**Design notes:** The condition-based border colour would require a small component change — passing a condition class to `TileShell`. Could alternatively be done purely in CSS using `:has()` selectors targeting the icon SVG colour class (e.g. `has(.text-amber-300)`).

---

## Adding a new theme

1. **Add a font** to the Google Fonts `<link>` in `frontend/index.html`
2. **Register the theme** in `frontend/src/theme/themes.ts`:
   ```ts
   { id: 'mytheme', label: 'My Theme', swatch: '#hexcolor' }
   ```
3. **Write the CSS block** in `frontend/src/index.css`:
   ```css
   [data-theme='mytheme'] body { font-family: ...; background: ...; }
   [data-theme='mytheme'] .border-white\/15 { border-color: ...; }
   /* ... etc */
   ```
4. For **light themes**, also remap all `text-white/*` variants to a dark colour (see Arctic Minimal or Pastel Studio blocks for a complete template).

The `ThemeProvider` (`src/theme/ThemeContext.tsx`) persists the selected theme in `localStorage` under the key `weather-theme` and writes `data-theme` onto `<html>` synchronously before first paint (via the inline script in `index.html`), so there is no flash of the wrong theme on reload.
