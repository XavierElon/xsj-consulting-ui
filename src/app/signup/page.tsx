import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import SignupModal from '@/components/modals/SignupModal'
import { useEffect, useState } from 'react'
import { useAuthorization } from '@/hooks/useAuthorization'

const SignUp: NextPage = () => {
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
          <div className="fle flex-col items-center justify-center min-h-screen">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex flex-col items-center justify-center">
              <div className="relative">
                <SignupModal></SignupModal>
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

export default SignUp
