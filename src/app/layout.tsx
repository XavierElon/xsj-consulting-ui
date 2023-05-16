'use client'
import React from 'react'
import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { CartStateProvider } from '@/context/CartContext'
import { AuthStateProvider } from '@/context/AuthContext'
import { ChatStateProvider } from '@/context/ChatContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <AuthStateProvider>
          <ChatStateProvider>
            <CartStateProvider>
              <Providers>{children}</Providers>
            </CartStateProvider>
          </ChatStateProvider>
        </AuthStateProvider>
      </body>
    </html>
  )
}
