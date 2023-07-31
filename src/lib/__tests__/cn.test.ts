import { describe, expect, it } from 'vitest'

import cn from '../cn'

describe('cn', () => {
  it('should return merged tailwind classes', () => {
    const classes = 'bg-primary-500 bg-primary-600'

    expect(cn(classes)).toBe('bg-primary-600')
  })
})
