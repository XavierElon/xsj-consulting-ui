'use client'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import '../../css/ellipsis.css'
import { useEffect } from 'react'

const Verified: NextPage = () => {
  useEffect(() => {})
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          <div className="flex w-1/2 bg-white mx-auto items-center justify-center">
            <h1
              className="text-black text-2xl"
              style={{ fontFamily: 'Epilogue' }}
            >
              Your account has been successfully created and confirmed.
            </h1>
            <LoginModal className=""></LoginModal>
          </div>
          <div className="w-1/2 bg-gradient-to-t from-[#77cafe] to-[#0069FF] p-8">
            <div className="relative">
              <div className="mask-ellipsis"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Verified
