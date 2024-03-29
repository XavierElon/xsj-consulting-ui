'use client'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import axios from 'axios'

const ChangePasswordModal = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  // const { authState } = useContext(AuthStateContext)

  const handlePasswordChange = (e: any) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      console.error('Passwords do not match')
      return
    } else {
      axios
        .put(process.env.NEXT_PUBLIC_USERS_CHANGE_PASSWORD_ROUTE!, {
          oldPassword: oldPassword,
          newPassword: newPassword,
          // email: user?.email,
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error)
          } else {
            console.log('Password successfully updated')
          }
        })
    }
  }

  return (
    <div className="flex flex-col container fixed top-1/2 transform -translate-y-1/2">
      <div
        style={containerStyle}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 style={headerStyle} className="text-black text-center">
          Change your password
        </h2>
        <form>
          <div className="al">
            <p style={pStyle} className="mx-10">
              <span className="text-[#0069FF]">old password </span>
              <span className="text-red-600 relative top-1">*</span>
            </p>
            <TextField
              required
              id="outlined-required"
              size="small"
              className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <p style={pStyle} className="mx-10">
            <span className="text-[#0069FF]">new password </span>
            <span className="text-red-600 relative top-1">*</span>
          </p>
          <TextField
            id="outlined-password-input"
            type="password"
            size="small"
            autoComplete="current-password"
            className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p style={pStyle} className="mx-10">
            <span className="text-[#0069FF]">confirm new password </span>
            <span className="text-red-600 relative top-1">*</span>
          </p>
          <TextField
            id="outlined-password-input"
            type="password"
            size="small"
            autoComplete="current-password"
            className="transform hover:scale-110 transition-all duration-300 w-80 mx-10"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
            style={submitButtonStyle}
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal

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
