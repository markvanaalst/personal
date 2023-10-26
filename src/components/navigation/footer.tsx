import Link from 'next/link'

import menu from '@/config/menu.json'
import cn from '@/lib/cn'
import { defaultMetadata } from '@/lib/metadata'

import { SocialButtons } from '../common/SocialButtons'
import { LogoIcon } from '../ui/icons'

const Footer = (): JSX.Element => {
  const date = new Date()
  const year = date.getFullYear()
  const { main } = menu

  return (
    <footer>
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <a href="/" aria-label="Go to the homepage">
            <LogoIcon className={cn('h-14')} aria-label="Logo" />
          </a>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            {main.map((menuItem, i) => (
              <Link
                href={menuItem.url}
                className="mx-4 text-sm transition-colors duration-300"
                aria-label={menuItem.name}
                key={i}
              >
                {menuItem.name}
              </Link>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm">
            © Copyright {year},
            <Link
              href={defaultMetadata.author.url}
              target="_blank"
              className="border-b border-gray-600 border-dotted dark:border-slate-50 hover:border-primary-500 dark:hover:border-primary-500"
            >
              {defaultMetadata.author.name}
            </Link>
            , All Rights Reserved.
          </p>

          <div className="flex gap-4 -mx-2">
            <SocialButtons
              className={cn('text-gray-600', 'hover:text-black')}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
