'use client'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import { auth } from '@/firebase/firebase'
import Layout from '@/components/Layout'
import Forbidden from '../forbidden/page'

const ChangePassword = () => {
  const [user] = useAuthState(auth)

  const handleChangePassword = () => {}

  return (
    <>
      {user ? (
        <>
          <Layout>
            <button
              type="submit"
              className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
              //   style={}
              onClick={handleChangePassword}
            >
              Log Out
            </button>
          </Layout>
        </>
      ) : (
        <Forbidden />
      )}
    </>
  )
}

export default ChangePassword
