import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { themes } from '../theme/themes';
import { PaletteIcon } from './icons';

export function ThemeSelector() {
  const { themeId, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = themes.find((t) => t.id === themeId) ?? themes[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={containerRef} className="fixed top-4 right-4 z-40">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select theme"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.12] px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/[0.20]"
      >
        <PaletteIcon className="h-3.5 w-3.5" />
        <span>{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/15 bg-black/55 shadow-2xl backdrop-blur-2xl">
          <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Theme
          </p>
          <ul className="p-1.5 pb-2">
            {themes.map((theme) => {
              const isActive = theme.id === themeId;
              return (
                <li key={theme.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setThemeId(theme.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 flex-none rounded-full border border-white/25"
                      style={{ backgroundColor: theme.swatch }}
                    />
                    <span>{theme.label}</span>
                    {isActive && (
                      <svg
                        className="ml-auto h-3.5 w-3.5 shrink-0 text-white/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
