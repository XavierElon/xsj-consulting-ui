'use client'
import React, { CSSProperties, useState } from 'react'
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

  return (
    // <div className="login-modal fixed left-1/6 top-1/2 transform -translate-y-1/2 mx-20">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       id="email"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />

    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       id="password"
    //       name="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <Box
    //       sx={{
    //         width: 500,
    //         maxWidth: '100%',
    //       }}
    //     >
    //       <TextField fullWidth label="fullWidth" id="fullWidth" />
    //     </Box>

    //     <button type="submit">Log In</button>
    //   </form>
    // </div>
    <div className="container fixed left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
      <div
        style={containerStyle}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 className="epilogue.className text-4xl font-bold text-black text-center">
          Log in to your account
        </h2>
      </div>
    </div>
  )
}

export default LoginModal

const containerStyle: CSSProperties = {
  width: '478px',
  height: '524px',
  marginLeft: '3%',
}
