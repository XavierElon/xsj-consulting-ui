'use client'
import React from 'react'
import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { UserStateProvider } from '@/context/CartContext'
import { LocalUserStateProvider } from '@/context/UserContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <LocalUserStateProvider>
          <UserStateProvider>
            <Providers>{children}</Providers>
          </UserStateProvider>
        </LocalUserStateProvider>
      </body>
    </html>
  )
}
