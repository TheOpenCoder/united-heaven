import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'United Heaven',
  description: 'United Heaven is an organization seeking to create a finer world through blockchain technology.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
