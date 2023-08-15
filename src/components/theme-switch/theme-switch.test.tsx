import { render } from '@testing-library/react'
import { vi } from 'vitest'

import ThemeSwitch from './theme-switch'

vi.mock('../../../hooks/use-theme', () => {
  return {
    useTheme: () => ({
      theme: 'light',
      mounted: true,
      setTheme: vi.fn(),
    }),
  }
})

describe('ThemeSwitch', () => {
  it('should renders without crashing', () => {
    expect(() => {
      render(<ThemeSwitch />)
    }).not.toThrow()
  })
})
