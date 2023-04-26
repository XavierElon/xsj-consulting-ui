'use client'
import React from 'react'
import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { UserStateProvider } from '@/context/CartContext'
import { LocalUserStateProvider } from '@/context/UserContext'
import { AuthStateProvider } from '@/context/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <AuthStateProvider>
          <LocalUserStateProvider>
            <UserStateProvider>
              <Providers>{children}</Providers>
            </UserStateProvider>
          </LocalUserStateProvider>
        </AuthStateProvider>
      </body>
    </html>
  )
}
