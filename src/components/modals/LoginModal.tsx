'use client'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import Image from 'next/image'
import GoogleLogo from 'public/google-logo.svg'
import { signInWithGooglePopup } from '@/firebase/firebase'
import 'react-toastify/dist/ReactToastify.css'
import { showEmailDoesNotExistErrorToastMessage, showIncorrectLoginInfoErrorToastMessage, showLoginSuccessToastMessage } from '@/utils/toast.helpers'
import { AuthStateContext } from '@/context/AuthContext'

const LoginModal = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { authState, setAuthState } = useContext(AuthStateContext)

  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_USERS_LOGIN_ROUTE!,
        {
          email,
          password
        },
        { withCredentials: true }
      )
      console.log(response)
      if (response.status === 200) {
        setErrorMessage('')
        showLoginSuccessToastMessage()

        setAuthState({
          authToken: response.data.accessToken,
          user: response.data.user.local,
          provider: 'local',
          id: response.data.user._id
        })

        localStorage.setItem('id', response.data.user._id)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('provider', 'local')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 401) {
        setErrorMessage(error.response.data.error)
        showEmailDoesNotExistErrorToastMessage()
        return
      } else if (error.response.status === 400) {
        setErrorMessage(error.response.data.error)
        showIncorrectLoginInfoErrorToastMessage()
        return
      }
    }
  }
  const handleGoogleLogin = async () => {
    const data = await signInWithGooglePopup()
    const googleAuthResult: any = data?.result

    setGoogleAuthState(googleAuthResult)

    showLoginSuccessToastMessage()
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const setGoogleAuthState = (googleAuthResult: any) => {
    const displayName: string = googleAuthResult.user.displayName!
    const email: string = googleAuthResult.user.email!
    const photoURL: string = googleAuthResult.user.photoURL!
    const firebaseUid: string = googleAuthResult.user.uid
    const accessToken: string = googleAuthResult.user.accessToken
    const refreshToken: string = googleAuthResult._tokenResponse.refreshToken

    const firebaseObj: any = {
      displayName: displayName,
      email: email,
      firebaseUid: firebaseUid,
      photoURL: photoURL,
      refreshToken: refreshToken
    }

    setAuthState({
      authToken: accessToken,
      user: firebaseObj,
      provider: 'firebaseGoogle',
      id: googleAuthResult.user._id,
      isLoggedIn: true,
      username: displayName
    })
  }

  return (
    <div className="flex flex-col container fixed left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
      <div style={containerStyle} className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md">
        <ToastContainer />
        <h2 style={headerStyle} className="text-black text-center">
          Log in to your account
        </h2>
        <form className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
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
            {errorMessage && <p className="text-red-600 relative top-1">{errorMessage}</p>}
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
            <Image src={GoogleLogo} width="16" height="16" alt="Google" className="inline-block mx-2" />
            Sign In with Google
          </Button>
          <Link href="/forgotpassword">
            <p className="underline text-[#0069FF] font-jetbrains">Forgot Password?</p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginModal

const containerStyle: CSSProperties = {
  width: '440px',
  height: '496px',
  marginLeft: '3%'
}

const headerStyle: CSSProperties = {
  fontFamily: 'Epilogue',
  fontSize: '32px',
  letterSpacing: '-.5px',
  lineHeight: '40px',
  fontWeight: '700'
}

const pStyle: CSSProperties = {
  marginTop: '15px'
}

const submitButtonStyle: CSSProperties = {
  width: '79%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%'
}

const googleButtonStyle: CSSProperties = {
  width: '80%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%'
}
