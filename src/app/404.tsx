import Link from 'next/link'

const NotFound = () => {
  console.log('not found')
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="container">
          <div className="section-inner primary-bordered">
            <div className="corner-black bordered-primary top-left" />
            <div className="corner-black bordered-primary bottom-right large" />
            <h4 className="text-white text-center ">
              On No, This Page Is Not Found!
            </h4>
            <h4 className="text-white text-center ">Return Home</h4>
            <Link
              href="/"
              className="custom-button small white w-inline-block text-center"
            >
              <div className="">
                <h1 className="text-white">Return Home</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
