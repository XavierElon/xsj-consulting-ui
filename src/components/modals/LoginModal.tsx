'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { TextField, Box, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { Epilogue } from 'next/font/google'
import Image from 'next/image'
import GoogleLogo from 'public/google-logo.svg'
import { signInWithGooglePopup } from '@/firebase/firebase'
import {
  showEmailDoesNotExistErrorToastMessage,
  showIncorrectLoginInfoErrorToastMessage,
  showLoginSuccessToastMessage,
} from '@/utils/toast.helpers'

const LoginModal = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    // Add your login logic here
    console.log('Email:', email, 'Password:', password)
    try {
      const response = await axios.post('http://localhost:1017/login', {
        email,
        password,
      })
      if (response.status === 200) {
        console.log('here')
        setErrorMessage('')
        showLoginSuccessToastMessage()
      }
    } catch (error: any) {
      if (error.status === 401) {
        setErrorMessage(error.response.data.error)
        showEmailDoesNotExistErrorToastMessage()
        return
      } else if (error.status === 400) {
        setErrorMessage(error.response.data.error)
        showIncorrectLoginInfoErrorToastMessage()
        return
      }
    }
  }
  const handleGoogleLogin = () => {
    signInWithGooglePopup()
  }

  return (
    <div className="flex flex-col container fixed left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
      <ToastContainer />
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
          <button
            type="submit"
            className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
            style={submitButtonStyle}
            onClick={handleLogin}
          >
            Log In
          </button>
          <Button
            variant="outlined"
            size="medium"
            className="inline-block text-black bg-white hover:bg-[#0061EB] rounded-lg border-gray-200 border-2 my-10 mx-10"
            sx={googleButtonStyle}
            onClick={() => handleGoogleLogin()}
          >
            <Image
              src={GoogleLogo}
              width="16"
              height="16"
              alt="Google"
              className="inline-block mx-2"
            />
            Sign In with Google
          </Button>
          <Link href="/forgotpassword">
            <p className="underline text-[#0069FF] font-jetbrains">
              Forgot Password?
            </p>
          </Link>
        </form>

        {errorMessage && (
          <p className="text-red-600 relative top-1">{errorMessage}</p>
        )}
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

const submitButtonStyle: CSSProperties = {
  width: '79%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%',
}

const googleButtonStyle: CSSProperties = {
  width: '80%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%',
}
