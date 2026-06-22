export interface Theme {
  id: string;
  label: string;
  /** CSS colour shown as a circular swatch in the picker */
  swatch: string;
}

export const themes: Theme[] = [
  { id: 'apple', label: 'Apple', swatch: '#5a7591' },
  { id: 'midnight', label: 'Midnight Cosmos', swatch: '#0a0a1a' },
  { id: 'desert', label: 'Desert Dusk', swatch: '#c4622d' },
  { id: 'neon', label: 'Neon Forecast', swatch: '#f72585' },
  { id: 'arctic', label: 'Arctic Minimal', swatch: '#e0f4ff' },
  { id: 'forest', label: 'Earthy Forest', swatch: '#2d3a2e' },
  { id: 'golden', label: 'Golden Hour', swatch: '#c9a84c' },
  { id: 'storm', label: 'Rainstorm', swatch: '#2d4a52' },
  { id: 'pastel', label: 'Pastel Studio', swatch: '#c4b5fd' },
  { id: 'terminal', label: 'Terminal Green', swatch: '#00ff41' },
];

export const defaultThemeId = 'apple';
