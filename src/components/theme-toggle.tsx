import { Moon, Sun } from 'lucide-react'

import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/components/theme-provider/useTheme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <Switch
      checked={isLight}
      onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
    >
      {isLight ? (
        <Sun className="size-3 text-primary" />
      ) : (
        <Moon className="size-3 text-primary" />
      )}
    </Switch>
  )
}
