import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/navigation/footer'
import Navbar from '@/components/navigation/navbar'
import Providers from '@/components/providers'
import cn from '@/lib/cn'
import { getMetadata } from '@/lib/metadata'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '500', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={cn('bg-background')}>
        <Providers>
          <header className="flex items-center justify-center">
            {/* <Navbar /> */}
            <Navbar />
          </header>
          <main role="main" className="">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
