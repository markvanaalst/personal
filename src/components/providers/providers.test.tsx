import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Providers from './providers'

describe('Providers', () => {
  it('should render correctly', () => {
    render(<Providers>Children</Providers>)
    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
