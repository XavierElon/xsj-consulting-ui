import * as React from 'react'

import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
