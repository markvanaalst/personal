import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useTheme } from '../use-theme'

describe('useDarkTheme', () => {
  it('should return correct states', async () => {
    vi.mock('next-themes', () => {
      return {
        useTheme: () => ({
          theme: 'light',
          resolvedTheme: 'light',
          setTheme: vi.fn(),
        }),
      }
    })

    const { result } = renderHook(() => useTheme())

    await waitFor(() => {
      const { theme } = result.current
      expect(theme).toBe(undefined)
    })

    expect(result.current.mounted).toBe(true)
  })
})
