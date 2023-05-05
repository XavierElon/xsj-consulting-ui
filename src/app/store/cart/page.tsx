import { NextPage } from 'next'
import Layout from '@/components/Layout'
import CartModal from '@/components/store/CartModal'

const Cart: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex items-center justify-center">
            <div className="relative">
              <CartModal></CartModal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Cart
