'use client'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import { auth } from '@/firebase/firebase'
import Layout from '@/components/Layout'
import Forbidden from '../../../forbidden/page'
import ChangePasswordModal from '@/components/modals/ChangePasswordModal'

const ChangePassword = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      {user ? (
        <>
          <Layout>
            <div className="flex min-h-screen">
              <div className="w-1/2 bg-gradient-to-t from-[#77cafe] to-[#0069FF] p-8">
                <div className="relative">
                  <div className="mask-ellipsis"></div>
                </div>
              </div>
              <div className="flex w-1/2 bg-white mx-auto items-center justify-ce">
                <ChangePasswordModal className=""></ChangePasswordModal>
              </div>
            </div>
          </Layout>
        </>
      ) : (
        <>
          <Layout>
            <Forbidden />
          </Layout>
        </>
      )}
    </>
  )
}

export default ChangePassword
