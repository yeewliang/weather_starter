import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultThemeId } from './themes';

const LS_KEY = 'weather-theme';

interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(
    () => localStorage.getItem(LS_KEY) ?? defaultThemeId
  );

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
    localStorage.setItem(LS_KEY, themeId);
  }, [themeId]);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
  }, []);

  return <ThemeContext.Provider value={{ themeId, setThemeId }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
