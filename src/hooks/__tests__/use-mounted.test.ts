import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useMounted } from '../use-mounted'

describe('useMounted', () => {
  it('should modify the state', () => {
    const { result } = renderHook(() => useMounted())
    expect(result.current).toBe(true)
    expect(typeof result.current).toBe('boolean')
  })
})
