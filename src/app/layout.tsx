import '@/globals.css'

import ThemeProvider from '@/core/ui/providers/theme-provider'

import { type Metadata, type Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Create Next WooCommerce',
  description: 'Create Next WooCommerce is an open-source project that helps you build a WooCommerce store with Next.js.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'black',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
