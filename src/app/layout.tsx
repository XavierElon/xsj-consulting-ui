'use client'
import React, { useState, useEffect, useRef } from 'react'

import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { UserStateProvider } from '@/context/CartContext'
import { ToastContainer } from 'react-toastify'

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
