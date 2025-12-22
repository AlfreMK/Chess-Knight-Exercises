import { useEffect, useState } from 'react'
import { type Theme, ThemeProviderContext } from './useTheme'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/**
 * Provides theme context to the application, managing light/dark mode preferences.
 * Persists the user's theme choice in localStorage and applies it to the document root.
 *
 * @param children - Components that will have access to the theme context
 * @param defaultTheme - Initial theme when no preference is stored (defaults to 'dark')
 * @param storageKey - localStorage key for persisting theme preference (defaults to 'vite-ui-theme')
 *
 * @see https://ui.shadcn.com/docs/dark-mode/vite
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
