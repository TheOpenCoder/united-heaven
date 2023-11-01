import type { Metadata } from 'next'
import { ColorModeProvider } from '@/context/ColorModeContext'
import WalletProvider from '@/provider/WalletProvider'
import ReactQueryProvider from '@/provider/ReactQueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'United Heaven',
  description: 'United Heaven is an organization seeking to create a finer world through blockchain technology.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-zinc-100 dark:bg-zinc-900 overscroll-none'>
        <ReactQueryProvider>
          <ColorModeProvider>
            <WalletProvider>{children}</WalletProvider>
          </ColorModeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
