import menu from '@config/menu.json'
import Link from 'next/link'
import React from 'react'

import cn from '@/lib/cn'

import { LogoIcon } from '../icons'
import ThemeSwitch from '../theme-switch'

const Navbar = () => {
  const { main } = menu

  return (
    <nav className={cn('container navbar')}>
      {/* logo */}
      <div className={cn('order-0')}>
        <a
          className={cn(
            'flex items-center justify-center font-medium title-font md:justify-start text-theme-text',
          )}
        >
          <LogoIcon className="h-14 text-theme-text" />
          <span className="ml-3 text-xl">
            Mark<span className="font-light">vanAalst</span>
          </span>
        </a>
      </div>
      <ul
        id="nav-menu"
        className="order-3 hidden w-full navbar-nav md:order-1 md:flex md:w-auto md:space-x-2"
      >
        {main.map((menu, i) => (
          <React.Fragment key={`menu-${i}`}>
            {menu.hasChildren ? (
              <li className="relative nav-item nav-dropdown group">
                <span className="inline-flex items-center nav-link hover:text-theme-link-hover ">
                  <a href="#" className="block nav-link">
                    {menu.name}
                  </a>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <ul className="hidden nav-dropdown-list group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 dark:bg-theme-dark">
                  {menu.children.map((child, i) => (
                    <li className="nav-dropdown-item" key={`children-${i}`}>
                      <Link
                        href={child.url}
                        passHref
                        className="block nav-dropdown-link hover:text-theme-link-hover"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <span className="inline-flex items-center nav-link hover:text-theme-link-hover">
                  <Link
                    href={menu.url}
                    passHref
                    className="block nav-link hover:text-theme-link-hover"
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
        <div className="p-1 text-xl cursor-pointer text-dark hover:text-primary">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
