'use client'
import { CSSProperties, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { TextField } from '@mui/material'
import {
  showPasswordMatchErrorToastMessage,
  showPasswordResetSuccessfullyToastMessage,
  showPasswordNotValidErrorToastMessage,
} from '@/utils/toast.helpers'
import { AuthStateContext } from '@/context/AuthContext'
import Forbidden from '@/app/forbidden/page'

const ChangePassword: NextPage = () => {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<any>(null)
  const {
    authState,
    authState: {
      user: { email },
    },
  } = useContext(AuthStateContext)
  const router = useRouter()

  console.log(authState)
  console.log(email)

  let authorized: boolean
  if (authState.provider !== null && authState.provider !== '') {
    authorized = true
  } else {
    authorized = true
  }

  useEffect(() => {
    if (validPassword !== null && !validPassword) {
      showPasswordNotValidErrorToastMessage()
    }
  }, [validPassword])

  const handleUpdatePassword = (e: any) => {
    e.preventDefault()
    axios
      .put(
        'http://localhost:1017/changepassword',
        {
          oldPassword,
          newPassword,
          email,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          showPasswordResetSuccessfullyToastMessage()
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      {authorized ? (
        <>
          <Layout>
            <div className="flex min-h-screen bg-white">
              <div className="w-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex flex-col justify-center items-center p-8">
                <div
                  style={containerStyle}
                  className="bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
                >
                  <>
                    <h2 style={headerStyle} className="text-black">
                      Change Password
                    </h2>
                    {/* <p className="text-[#4D5B7C] py-4">
                    Enter a new password for the email you provided.
                  </p> */}
                    <form>
                      <p className="mx-2 py-2">
                        <span className="text-[#0069FF]">old password </span>
                        <span className="text-red-600 relative top-1">*</span>
                      </p>
                      <TextField
                        required
                        id="outlined-required"
                        size="small"
                        type="password"
                        className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
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
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <p className="mx-2 py-2">
                        <span className="text-[#0069FF]">
                          confirm password{' '}
                        </span>
                        <span className="text-red-600 relative top-1">*</span>
                      </p>
                      <TextField
                        required
                        id="outlined-required"
                        size="small"
                        type="password"
                        className="transform hover:scale-110 transition-all duration-300 w-96 mx-2"
                        onChange={(e) => {
                          // setConfirmPassword(e.target.value)
                          setPasswordsMatch(e.target.value === newPassword)
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
                        Change Password
                      </button>
                    </form>
                  </>
                </div>
              </div>
            </div>
          </Layout>
        </>
      ) : (
        <>
          <Forbidden></Forbidden>
        </>
      )}
    </>
  )
}

export default ChangePassword

const containerStyle: CSSProperties = {
  width: '440px',
  height: '70%',
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
