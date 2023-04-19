import { NextPage } from 'next'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'

const Login: NextPage = () => {
  return (
    <>
      <Layout>
        <LoginModal className="fixed left-1/4 top-1/2 transform -translate-y-1/2"></LoginModal>
      </Layout>
    </>
  )
}

export default Login
