import * as React from 'react'

import { Providers } from './providers'
import './globals.css'
import Layout from '@/components/Layout'
import './landing.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
      </head>

      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}