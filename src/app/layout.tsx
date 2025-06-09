import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { getMetadata } from '@/lib/metadata';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-caveat-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = getMetadata()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakartaSans.variable} ${caveat.variable} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          
          {children}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
