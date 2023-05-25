'use client'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { useAuthorization } from '@/hooks/useAuthorization'
import LoginModal from '@/components/modals/LoginModal'
import '../../css/ellipsis.css'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  let authorized: boolean | null = null
  authorized = useAuthorization()

  useEffect(() => {
    if (authorized !== null) {
      setLoading(false)
      if (authorized === true) {
        router.push('/')
      }
    }
  }, [authorized, router])

  const returnHome = () => {
    router.push('/')
  }

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
  }

  return (
    <>
      {!authorized ? (
        <Layout>
          <div className="flex min-h-screen">
            <div className="flex w-1/2 bg-white mx-auto items-center justify-center">
              <LoginModal className=""></LoginModal>
            </div>
            <div className="w-1/2 bg-gradient-to-t from-[#77cafe] to-[#0069FF] p-8">
              <div className="relative">
                <div className="mask-ellipsis"></div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <>{returnHome()}</>
      )}
    </>
  )
}

export default Login
