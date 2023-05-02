'use client'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <>
      <div className="w-full bg-slate-100 py-4 mt-auto h-16">
        <div className="w-full text-center h-full">
          <div className="flex justify-between items-center h-full px-2 md:px-4 lg:px-6">
            <div className="flex items-center">
              <ul className="flex space-x-4">
                <li className="text-gray-500 text-sm">
                  <Link href="/">xsj.com</Link>
                </li>
                <li className="text-gray-400 text-sm">Blog</li>
                <li className="text-gray-500 text-sm">Careers</li>
                <li className="text-gray-500 text-sm">Documentation</li>
              </ul>
            </div>
            <div className="flex items-center">
              <ul className="flex space-x-4">
                <li className="text-gray-500 text-sm">Terms of Service</li>
                <li className="text-gray-500 text-sm">Privacy</li>
                <li className="text-gray-500 text-sm">Cookies</li>
                <li className="text-gray-500 text-sm">© 2023 xsj.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
