'use client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { useAuthorization } from '@/hooks/useAuthorization'
import LoginModal from '@/components/modals/LoginModal'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const authorized = useAuthorization()

  useEffect(() => {
    if (authorized !== null) {
      setLoading(false)
      if (authorized === true) {
        router.push('/')
      }
    }
  }, [authorized, router])

  if (loading || authorized) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
  }

  return (
    <Layout>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </Head>
      <div className="flex min-h-screen">
        <div className="flex w-1/2 bg-white mx-auto items-center justify-center">
          <LoginModal className=""></LoginModal>
        </div>
        <div className="w-1/2 bg-gradient-to-t from-[#77cafe] to-[#0069FF] p-8">
          <div className="relative"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
