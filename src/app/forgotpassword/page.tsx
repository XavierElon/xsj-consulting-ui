'use client'
import { CSSProperties, useContext, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import '../../css/ellipsis.css'
import { UserStateContext } from '@/context/CartContext'
import { TextField } from '@mui/material'
import cryptoRandomString from 'crypto-random-string'
import { LocalUserStateContext } from '@/context/UserContext'

const ForgotPassword: NextPage = () => {
  // const [userEmail, setUserEmail] = useState<string>('')
  const [showOtpInput, setShowOtpInput] = useState<boolean>(true)
  const { setEmail, setOtp } = useContext(LocalUserStateContext)
  const [localOtp, setLocalOtp] = useState<string>()
  const [validOtp, setValidOtp] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')

  const OTP_LENGTH: number = 6
  const OTP_CHARACTERS: string = '0123456789'

  const OTP: string = cryptoRandomString({
    length: OTP_LENGTH,
    characters: OTP_CHARACTERS,
  })

  const handlePasswordReset = () => {
    console.log('clicked')
  }

  const verifyOTP = () => {
    if (OTP === localOtp) {
    }
  }

  const handleUpdatePassword = () => {}

  return (
    <>
      <Layout>
        <div className="flex min-h-screen bg-white">
          <div className="w-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex flex-col justify-center items-center p-8">
            <div
              style={containerStyle}
              className="bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
            >
              {!showOtpInput ? (
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
                      className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2"
                      style={submitButtonStyle}
                      onClick={verifyOTP}
                    >
                      Submit OTP
                    </button>
                  </form>
                </>
              ) : validOtp ? (
                <>
                  <h2 style={headerStyle} className="text-black">
                    Update Password
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
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2"
                      style={submitButtonStyle}
                      onClick={handlePasswordReset}
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
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-2"
                      style={submitButtonStyle}
                      onClick={handlePasswordReset}
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
  height: '304px',
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
