'use client'
import React, { useContext, useEffect } from 'react'
import { Providers } from './providers'
import './globals.css'
import './stars.css'
import '@fontsource/epilogue'
import { UserStateProvider } from '@/context/CartContext'
import { AuthStateContext, AuthStateProvider } from '@/context/AuthContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { authState, setAuthState } = useContext(AuthStateContext)
  // useEffect(() => {
  //   console.log(authState)
  // }, [])

  const [user] = useAuthState(auth)

  useEffect(() => {
    console.log('auth state')
    console.log(user)
  }, [])

  useEffect(() => {
    console.log('user')
    console.log(user)
  }, [auth])

  return (
    <html>
      <head></head>
      <body>
        <AuthStateProvider>
          <UserStateProvider>
            <Providers>{children}</Providers>
          </UserStateProvider>
        </AuthStateProvider>
      </body>
    </html>
  )
}
