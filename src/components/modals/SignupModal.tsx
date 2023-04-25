'use client'
import React, { CSSProperties, useEffect, useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import { Epilogue } from 'next/font/google'
import Image from 'next/image'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import GoogleLogo from 'public/google-logo.svg'
import { signInWithGooglePopup } from '@/firebase/firebase'
import { validateEmail, validatePassword } from '@/utils/verification.helpers'
import {
  showEmailNotValidErrorToastMessage,
  showPasswordMatchErrorToastMessage,
  showPasswordNotValidErrorToastMessage,
  showSignupSuccessToastMessage,
} from '@/utils/toast.helpers'
import { ToastContainer } from 'react-toastify'

const SignupModal = (props: any) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (validPassword !== null && !validPassword) {
      showPasswordNotValidErrorToastMessage()
    }
  }, [validPassword])

  const handleSignup = (e: any) => {
    e.preventDefault()
    setValidPassword(validatePassword(password))

    if (!passwordsMatch) {
      showPasswordMatchErrorToastMessage()
      return
    } else if (!validEmail || email === '') {
      showEmailNotValidErrorToastMessage()
      return
    } else {
      axios
        .post('http://localhost:1017/signup', {
          local: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
          provider: 'local',
        })
        .then((result) => {
          console.log(result)
          showSignupSuccessToastMessage()
        })
        .catch((error) => {
          console.error(error)
          if (error.response.status === 400) {
            setErrorMessage(error.response.data.error)
            return
          }
        })
    }
  }

  const handleGoogleLogin = () => {
    signInWithGooglePopup()
  }

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <div
        style={{ ...containerStyle, width: '450px' }}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 style={headerStyle} className="text-black text-center">
          Sign Up with Email
        </h2>
        <form>
          <div className="al">
            <p style={pStyle} className="mx-10">
              <span className="text-[#0069FF]">first name </span>
              <span className="text-red-600 relative top-1">*</span>
            </p>
            <TextField
              required
              id="outlined-required"
              size="small"
              className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="al">
            <p style={pStyle} className="mx-10">
              <span className="text-[#0069FF]">last name </span>
              <span className="text-red-600 relative top-1">*</span>
            </p>
            <TextField
              required
              id="outlined-required"
              size="small"
              className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <p style={pStyle} className="mx-10">
            <span className="text-[#0069FF]">email </span>
            <span className="text-red-600 relative top-1">*</span>
          </p>
          <TextField
            id="outlined-email-input"
            size="small"
            autoComplete="current-email"
            className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && validEmail && (
            <p className="text-red-600 relative mx-10 top-1">{errorMessage}</p>
          )}
          {!validEmail && (
            <div className="h-6">
              <p className="text-red-600 mx-10">Email address must be valid</p>
            </div>
          )}
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
          <p style={pStyle} className="mx-10">
            <span className="text-[#0069FF]">confirm password </span>
            <span className="text-red-600 relative top-1">*</span>
          </p>
          <TextField
            id="outlined-password-input"
            type="password"
            size="small"
            autoComplete="current-password"
            className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setPasswordsMatch(e.target.value === password)
            }}
          />
          {!passwordsMatch && (
            <div className="h-6">
              <p className="text-red-600 mx-10">Passwords do not match</p>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
            style={submitButtonStyle}
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <Button
            variant="outlined"
            size="medium"
            className="inline-block text-black bg-white hover:bg-[#0061EB] rounded-lg border-gray-200 border-2 mx-10"
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
            Sign Up with Google
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignupModal

const containerStyle: CSSProperties = {
  width: '90%',
  height: '36%',
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
}

// const forgotPasswordStyle: CSSProperties = {
//   fontFamily: 'Jetbrains Mono',
// }
