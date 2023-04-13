import Image from 'next/image'

export const Footer = () => {
  return (
    <>
      <div className="mx-auto w-full bg-gradient-to-r from-red-600 via-purple-600 to-purple-700 bg-clip bg-transparent text-5xl font-black">
        <div className="py-10 px-5 md:px-20 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/3 max-w-2xl mx-auto text-white">
            <p className="text-center md:text-left text-lg md:text-4xl font-medium">
              Download Our App?
              <br />
              <span className="text-sm md:text-lg">
                Solve All Your Problems Now. We are Here All day, every day!
              </span>
            </p>

            <div className="mt-10 flex justify-center md:justify-start">
              <div className="flex items-center border rounded-lg px-4 py-2 w-52 md:w-60 mx-2">
                <Image src="https://cdn-icons-png.flaticon.com/512/888/888857.png" height="7" width="8" alt={''} />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on</p>
                  <p className="text-sm md:text-base">Google Play Store</p>
                </div>
              </div>
              <div className="flex items-center border rounded-lg px-4 py-2 w-44 md:w-52 mx-2">
                <Image src="https://cdn-icons-png.flaticon.com/512/888/888841.png" height="7" width="8" alt={''} />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on</p>
                  <p className="text-sm md:text-base">Apple Store</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 py-5">
            <p className="order-2 mt-6 md:mt-0 rounded animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black text-center md:text-left">
              &copy; DevGru Solutions, 2023.
            </p>
            <div className="mt-6 md:mt-4 flex flex-col md:flex-row md:justify-end items-center text-sm text-gray-400">
              <span className="px-2 text-white">About us</span>
              <span className="px-2 border-l text-white">Contact us</span>
              <span className="px-2 border-l text-white">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
