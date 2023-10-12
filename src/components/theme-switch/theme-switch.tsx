'use client'

import { useTheme } from '@/hooks'
import cn from '@/lib/cn'

import Button from '../ui/button'
import { Moon, Sun } from '../ui/icons'

const ThemeSwitch = () => {
  const { theme, mounted, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <>
      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className={cn('w-5 h-5')} />
          ) : (
            <Moon className={cn('w-5 h-5')} />
          )}
        </Button>
      )}
    </>
  )
}

export default ThemeSwitch
