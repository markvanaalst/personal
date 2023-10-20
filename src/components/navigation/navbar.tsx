'use client'
import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from 'react'

import cn from '@/lib/cn'

import ThemeSwitch from '../theme-switch'
import { LogoIcon } from '../ui/icons'
import menu from '.config/menu.json'

const hoverClasses =
  'transition-all duration-500 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'

const NavBar = () => {
  const { main } = menu

  const [navFixed, setNavFixed] = useState(false)
  const [idSeed] = useId()
  const qsMenuId = idSeed
  const buttonId = `${idSeed}--button`

  const quickStartMenuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  const toggleQuickStartMenu = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    const pageClickEvent = (event: Event) => {
      if (
        quickStartMenuRef.current !== null &&
        !quickStartMenuRef?.current?.contains(event.target as Node)
      ) {
        setOpen(!isOpen)
      }
    }

    const timeoutId = setTimeout(() => {
      if (isOpen) {
        window.addEventListener('click', pageClickEvent, false)
      }
    }, 0)

    const changeNavbarBackground = () => {
      if (window.pageYOffset >= 1) {
        setNavFixed(true)
      } else {
        setNavFixed(false)
      }
    }

    return () => {
      clearTimeout(timeoutId)
      window.addEventListener('scroll', changeNavbarBackground)
      window.removeEventListener('click', pageClickEvent, false)
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-theme-bg transition-all w-full ${
          navFixed ? 'shadow opacity-90 ' : ''
        }`}
      >
        <nav className="container flex justify-between gap-2 px-2 navbar">
          {/* logo */}
          <div className="order-0">
            <Link
              href="/"
              className="flex items-center justify-center font-medium title-font md:justify-start text-theme-text"
            >
              <LogoIcon className="h-14 text-theme-text" aria-label="Logo" />
              <span className="ml-3 text-xl">
                Mark<span className="font-light">vanAalst</span>
              </span>
            </Link>
          </div>
          {/* navbar toggler */}
          <input id="nav-toggle" type="checkbox" className="hidden" />
          <label
            id="show-button"
            htmlFor="nav-toggle"
            className="flex items-center order-2 cursor-pointer md:order-1 md:hidden"
          >
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          </label>
          <label
            id="hide-button"
            htmlFor="nav-toggle"
            className="items-center order-2 hidden cursor-pointer md:order-1"
          >
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          </label>
          {/* /navbar toggler */}

          <ul
            id="nav-menu"
            className="order-3 hidden w-full navbar-nav md:order-1 md:flex md:w-auto md:space-x-2"
          >
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="relative nav-item nav-dropdown group">
                    <button
                      id={buttonId}
                      className="transition w-inherit h-inherit hover:text-violet"
                      onClick={toggleQuickStartMenu}
                      aria-expanded={isOpen}
                    >
                      <span
                        className={cn(
                          'inline-flex items-center nav-link hover:text-theme-link-hover',
                          hoverClasses,
                        )}
                      >
                        <a href="#" className="block nav-link">
                          {menu.name}
                        </a>
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                    <div className="hidden group-hover:grid">
                      <ul
                        id={qsMenuId}
                        aria-labelledby={buttonId}
                        className={`md:absolute bg-background md:shadow-lg w-[400px] gap-2 md:p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-left ${
                          isOpen ? 'grid' : 'hidden'
                        }`}
                      >
                        {menu.children.map((child, i) => (
                          <li className={hoverClasses} key={`children-${i}`}>
                            <a
                              href={child.url}
                              className={cn(
                                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {child.name}
                              </div>
                              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                                {child.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className={hoverClasses}>
                    <span className="inline-flex items-center nav-link hover:text-theme-link-hover">
                      <Link
                        href={menu.url}
                        passHref
                        className={cn(
                          'block nav-link hover:text-theme-link-hover rounded-md',
                        )}
                      >
                        {menu.name}
                      </Link>
                    </span>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
          <div className="flex order-1 ml-auto md:order-2 md:ml-0">
            {/* <div
              className="p-2 text-xl cursor-pointer text-dark hover:text-primary"
              // onClick={() => {
              //   setSearchModal(true)
              // }}
            >
              <IoSearch className="fill-current" />
            </div> */}
            <div className="p-1 text-xl cursor-pointer text-dark hover:text-primary">
              <ThemeSwitch />
            </div>
          </div>
          {/* <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          /> */}
        </nav>
      </header>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none`,
          hoverClasses,
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default NavBar
