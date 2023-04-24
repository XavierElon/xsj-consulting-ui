import { NextPage } from 'next'
import Layout from '@/components/Layout'
import SignupModal from '@/components/modals/SignupModal'

const SignUp: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex items-center justify-center">
            <div className="relative">
              <div className="mask-ellipsis"></div>
              <SignupModal></SignupModal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SignUp
