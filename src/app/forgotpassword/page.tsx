'use client'
import { CSSProperties, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import Layout from '@/components/Layout'
import '../../css/ellipsis.css'
import { TextField } from '@mui/material'
import cryptoRandomString from 'crypto-random-string'
import {
  showPasswordResetSuccessfullyToastMessage,
  showPasswordNotValidErrorToastMessage,
} from '@/utils/toast.helpers'
import { validatePassword } from '@/utils/verification.helpers'

const ForgotPassword: NextPage = () => {
  const [otpEmailSent, setOtpEmailSent] = useState<boolean>(false)
  const [recipientEmail, setRecipientEmail] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [localOtp, setLocalOtp] = useState<string>()
  const [validOtp, setValidOtp] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<any>(null)
  const [timerCount, setTimerCount] = useState<number>(120)
  const [disabled, setDisabled] = useState<boolean>(false)

  const OTP_LENGTH: number = 6
  const OTP_CHARACTERS: string = '0123456789'

  useEffect(() => {}, [validPassword])

  const sendOTP = (e: any) => {
    e.preventDefault()
    setDisabled(false)
    const OTP: string = cryptoRandomString({
      length: OTP_LENGTH,
      characters: OTP_CHARACTERS,
    })
    setOtp(OTP)
    axios
      .post(process.env.NEXT_PUBLIC_USERS_SEND_RECOVERY_EMAIL_ROUTE!, {
        OTP,
        recipientEmail,
      })
      .then((response) => {
        if (response.status === 200) {
          setOtpEmailSent(true)
          setTimerCount(120)
          const interval = setInterval(() => {
            setTimerCount((prevTimerCount) => {
              if (prevTimerCount <= 1) {
                setDisabled(true)
                clearInterval(interval)
              }
              return prevTimerCount - 1
            })
          }, 1000)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const verifyOTP = (e: any) => {
    e.preventDefault()

    if (otp === localOtp) {
      setOtpEmailSent(false)
      setValidOtp(true)
    }
  }

  const handleUpdatePassword = (e: any) => {
    e.preventDefault()
    setValidPassword(validatePassword(password))

    if (validPassword !== null && !validPassword) {
      showPasswordNotValidErrorToastMessage()
      return
    } else {
      axios
        .put(process.env.NEXT_PUBLIC_USERS_SEND_RESET_PASSWORD_ROUTE!, {
          password,
          recipientEmail,
        })
        .then((result) => {
          console.log(result)
          if (result.status === 200) {
            showPasswordResetSuccessfullyToastMessage()
            setTimeout(() => {
              window.location.assign('/login')
            }, 2000)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <Layout>
        <div className="flex min-h-screen bg-white">
          <div className="w-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex flex-col justify-center items-center p-8">
            <div
              style={containerStyle}
              className="bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
            >
              {otpEmailSent ? (
                <>
                  <h2 style={headerStyle} className="text-black">
                    Enter OTP to Reset Password
                  </h2>
                  <form>
                    <p className="mx-2 py-2">
                      <span className="text-[#0069FF]">OTP:</span>
                    </p>
                    <TextField
                      required
                      id="outlined-required"
                      size="small"
                      type="number"
                      placeholder="######"
                      className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                      onChange={(e) => setLocalOtp(e.target.value)}
                    />

                    <button
                      type="submit"
                      className={`text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2 ${
                        disabled ? 'bg-slate-400 cursor-not-allowed' : ''
                      }`}
                      style={submitButtonStyle}
                      onClick={verifyOTP}
                      disabled={disabled}
                    >
                      Submit OTP
                    </button>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Did not recieve your code?</p>
                      <button
                        className="flex flex-row items-center"
                        style={{
                          color: disabled ? 'blue' : 'gray',
                          cursor: disabled ? 'pointer' : '',
                          textDecorationLine: disabled ? 'underline' : 'none',
                        }}
                        disabled={!disabled}
                        onClick={sendOTP}
                      >
                        {disabled
                          ? 'Resend OTP'
                          : `Resend OTP in ${timerCount}s`}
                      </button>
                    </div>
                  </form>
                </>
              ) : validOtp ? (
                <>
                  <h2 style={headerStyle} className="text-black">
                    Update Password
                  </h2>
                  <p className="text-[#4D5B7C] py-4">
                    Enter a new password for the email you provided.
                  </p>
                  <form>
                    <p className="mx-2 py-2">
                      <span className="text-[#0069FF]">password </span>
                      <span className="text-red-600 relative top-1">*</span>
                    </p>
                    <TextField
                      required
                      id="outlined-required"
                      size="small"
                      type="password"
                      className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="mx-2 py-2">
                      <span className="text-[#0069FF]">confirm password </span>
                      <span className="text-red-600 relative top-1">*</span>
                    </p>
                    <TextField
                      required
                      id="outlined-required"
                      size="small"
                      type="password"
                      className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                      onChange={(e) => {
                        setPasswordsMatch(e.target.value === password)
                      }}
                    />
                    {!passwordsMatch && (
                      <div className="h-6">
                        <p className="text-red-600 mx-10">
                          Passwords do not match
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2"
                      style={submitButtonStyle}
                      onClick={handleUpdatePassword}
                    >
                      Request Password Reset
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 style={headerStyle} className="text-black">
                    Forgot password?
                  </h2>
                  <p className="text-[#4D5B7C] py-4">
                    Enter the email address associated with your account and we
                    will send you a link to reset your password.
                  </p>
                  <form>
                    <p className="mx-2 py-2">
                      <span className="text-[#0069FF]">email address </span>
                      <span className="text-red-600 relative top-1">*</span>
                    </p>
                    <TextField
                      required
                      id="outlined-required"
                      size="small"
                      className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2"
                      style={submitButtonStyle}
                      onClick={sendOTP}
                    >
                      Request Password Reset
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ForgotPassword

const containerStyle: CSSProperties = {
  width: '440px',
  height: '350px',
  marginLeft: '3%',
}

const headerStyle: CSSProperties = {
  fontFamily: 'Epilogue',
  fontSize: '32px',
  letterSpacing: '-.5px',
  lineHeight: '40px',
  fontWeight: '700',
}

const submitButtonStyle: CSSProperties = {
  width: '94%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%',
}
