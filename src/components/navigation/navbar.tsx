import { cva } from 'class-variance-authority'
import Link from 'next/link'
import React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu/navigation-menu'
import menu from '@/config/menu.json'
import cn from '@/lib/cn'

import ThemeSwitch from '../theme-switch'
import { LogoIcon } from '../ui/icons'

const Navbar = () => {
  const { main } = menu
  const navigationMenuTriggerStyle = cva(
    'group inline-flex h-9 w-max mx-8 my-2 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 uppercase tracking-widest font-normal',
  )

  return (
    <nav className={cn('container px-2 md:px-8 navbar')}>
      {/* logo */}
      <div className={cn('order-0')}>
        <Link
          className={cn(
            'flex items-center justify-center font-medium title-font md:justify-start text-theme-text',
          )}
          title="Home"
          aria-label="Go to the homepage"
          href={'/'}
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
        <svg className="h-6 currentColor" viewBox="0 0 20 20">
          <title>Menu Close</title>
          <polygon
            points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
            transform="rotate(45 10 10)"
          />
        </svg>
      </label>
      {/* /navbar toggler - hide for mobile */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.children ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    {menu.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {menu.children?.map((child) => (
                        <ListItem
                          key={child.name}
                          title={child.name}
                          href={child.url}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <Link href={menu.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      {menu.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </React.Fragment>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex order-1 ml-auto md:order-2 md:ml-0">
        <div className="p-1 text-xl cursor-pointer text-dark hover:text-primary">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default Navbar
