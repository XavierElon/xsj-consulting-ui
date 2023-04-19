import { NextPage } from 'next'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import '../../css/ellipsis.css'

const Login: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          <div className="flex w-1/2 bg-white mx-auto items-center justify-center">
            <LoginModal className=""></LoginModal>
          </div>
          {/* <div className="w-1/2 bg-[#6AA7F8]">
            <p>Right-side content goes here.</p>
          </div> */}
          <div className="w-1/2 bg-gradient-to-t from-[#77cafe] to-[#0069FF] p-8">
            <div className="relative">
              <div className="mask-ellipsis">
                Some text that is long enough to be truncated with an ellipsis
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
