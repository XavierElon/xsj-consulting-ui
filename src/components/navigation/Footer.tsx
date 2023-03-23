'use client'
import Image from 'next/image'

export const Footer = () => {
  return (
    <>
        <div className=" py-10 px-20 flex justify-between items-center">
            <p className=" text-white"> <span className="text-4xl font-medium">Download Our App?</span> <br/> <span className="text-lg">Solve All Your Problems Now. We are Here All day, every day! </span></p>
         
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">

            <div className="flex justify-center my-10">
                <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                    <Image src="https://cdn-icons-png.flaticon.com/512/888/888857.png"  height="7" width="8" alt={''}/>
                    <div className="text-left ml-3">
                        <p className='text-xs text-gray-200'>Download on </p>
                        <p className="text-sm md:text-base"> Google Play Store </p>
                    </div>
                </div>
                <div className="flex items-center border rounded-lg px-4 py-2 w-44 mx-2">
                    <Image src="https://cdn-icons-png.flaticon.com/512/888/888841.png" height="7" width="8" alt={''}/>
                    <div className="text-left ml-3">
                        <p className='text-xs text-gray-200'>Download on </p>
                        <p className="text-sm md:text-base"> Apple Store </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0 rounded animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
            &copy; DevGru Solutions, 2023.</p>
            <div className="order-1 md:order-2">
                <span className="px-2 text-white">About us</span>
                <span className="px-2 border-l text-white">Contact us</span>
                <span className="px-2 border-l text-white">Privacy Policy</span>
            </div>
        </div>
    </div>
      </div>
\
    </>
  )
}


export default Footer
