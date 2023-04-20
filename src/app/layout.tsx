import * as React from 'react'

import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { UserStateProvider } from '@/context/UserContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <UserStateProvider>
          <Providers>{children}</Providers>
        </UserStateProvider>
      </body>
    </html>
  )
}
