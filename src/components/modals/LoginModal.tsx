'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { TextField, Box } from '@mui/material'
import { Epilogue } from 'next/font/google'

const epilogue = Epilogue({ subsets: ['latin'] })

const LoginModal = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Add your login logic here
    console.log('Email:', email, 'Password:', password)
  }

  useEffect(() => {
    console.log(password)
  }, [password])

  return (
    <div className="flex flex-col container fixed left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
      <div
        style={containerStyle}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 style={headerStyle} className="text-black text-center">
          Log in to your account
        </h2>
        <form>
          <div className="al">
            <p style={pStyle} className="mx-10">
              <span className="text-[#0069FF]">email </span>
              <span className="text-red-600 relative top-1">*</span>
            </p>
            <TextField
              required
              id="outlined-required"
              size="small"
              className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p style={pStyle} className="mx-10">
            <span className="text-[#0069FF]">password </span>
            <span className="text-red-600 relative top-1">*</span>
          </p>
          <TextField
            id="outlined-password-input"
            type="password"
            size="small"
            autoComplete="current-password"
            className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default LoginModal

const containerStyle: CSSProperties = {
  width: '440px',
  height: '496px',
  marginLeft: '3%',
}

const headerStyle: CSSProperties = {
  fontFamily: 'Epilogue',
  fontSize: '32px',
  letterSpacing: '-.5px',
  lineHeight: '40px',
  fontWeight: '700',
}

const pStyle: CSSProperties = {
  marginTop: '15px',
}
