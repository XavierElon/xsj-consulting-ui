'use client'
import Image from 'next/image'

export const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#323232] py-4 mt-auto h-36">
        <div className="container mx-auto text-center">
          <p className="text-white">
            Copyright © {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
