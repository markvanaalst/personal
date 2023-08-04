import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Logo, LogoIcon, Moon, Sun } from './icons'

describe('Moon', () => {
  it('should render Moon icon', () => {
    render(<Moon data-testid="moon" />)
    expect(screen.getByTestId('moon')).toBeInTheDocument()
  })
})

describe('Sun', () => {
  it('should render Sun icon', () => {
    render(<Sun data-testid="sun" />)
    expect(screen.getByTestId('sun')).toBeInTheDocument()
  })
})

describe('Logo', () => {
  it('should render Logo', () => {
    render(<Logo data-testid="logo" />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
})

describe('LogoIcon', () => {
  it('should render Logo icon', () => {
    render(<LogoIcon data-testid="logoIcon" />)
    expect(screen.getByTestId('logoIcon')).toBeInTheDocument()
  })
})
