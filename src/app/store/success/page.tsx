import Layout from '@/components/Layout'

const Success = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-slate-500">Thank you for your purchase!</h1>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Success
