import '@/styles/app.css'

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'
import Link from 'next/link'

import Analytics from '@/components/analytics'
import Providers from '@/components/providers'
import Navbar from '@/components/ui/navigation/navbar'
import { defaultMetadata, getMetadata } from '@/lib/metadata'

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <Providers>
          <header className="flex items-center justify-end">
            <Navbar />
          </header>
          <main role="main" className="">
            {children}
          </main>
          <footer className="flex items-center justify-center">
            <span className="mr-1">© {year}</span>
            <Link
              href={defaultMetadata.author.url}
              target="_blank"
              className="border-b border-gray-600 border-dotted dark:border-slate-50 hover:text-primary-500 hover:border-primary-500 dark:hover:border-primary-500"
            >
              {defaultMetadata.author.name}
            </Link>
          </footer>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
