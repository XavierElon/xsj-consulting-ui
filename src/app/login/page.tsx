import { NextPage } from 'next'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'

const Login: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          <div className="flex w-1/2 bg-white mx-auto items-center justify-center">
            <LoginModal className=""></LoginModal>
          </div>
          <div className="w-1/2 bg-[#6AA7F8]">
            <p>Right-side content goes here.</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
