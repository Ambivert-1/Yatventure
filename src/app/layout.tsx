import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YatVenture',
  description: 'Community travel platform for Nepal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}