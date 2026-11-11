import { useTheme } from '../hooks/useTheme.js'

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

/**
 * Switch que alterna entre tema claro e escuro.
 * Escuro: bolinha à esquerda com lua. Claro: bolinha à direita com sol.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
      onClick={toggleTheme}
      data-testid="theme-toggle"
      className={`relative h-6 w-14 shrink-0 cursor-pointer rounded-full border border-zinc-900/10 bg-white/50 backdrop-blur-md transition-colors duration-300 hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 ${className}`}
    >
      <span
        className={`absolute top-1/2 left-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md transition-transform duration-300 ${
          isLight ? 'translate-x-6' : '-translate-x-1'
        }`}
      >
        {isLight ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </span>
    </button>
  )
}
