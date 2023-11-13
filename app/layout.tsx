import type { Metadata } from 'next'
import { ColorModeProvider } from '@/context/ColorModeContext'
import { AuthProvider } from '@/context/AuthContext'
import WalletProvider from '@/provider/WalletProvider'
import ReactQueryProvider from '@/provider/ReactQueryProvider'
import { Analytics } from '@vercel/analytics/react'
import NotificationToaster from '@/components/NotificationToaster'

import './globals.css'

export const metadata: Metadata = {
  title: 'United Heaven',
  description: 'United Heaven is an organization seeking to create a finer world through blockchain technology.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className='bg-zinc-100 dark:bg-zinc-900 overscroll-none'>
        <ReactQueryProvider>
          <ColorModeProvider>
            <NotificationToaster />
            <WalletProvider>
              <AuthProvider>{children}</AuthProvider>
            </WalletProvider>
          </ColorModeProvider>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
