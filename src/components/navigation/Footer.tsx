'use client'
import Image from 'next/image'

export const Footer = () => {
  return (
    <>
      <div className="w-full bg-slate-100 py-4 mt-auto h-24">
        <div className="w-full text-center h-full">
          <div className="flex justify-between items-center h-full px-2 md:px-4 lg:px-6">
            <div className="flex items-center">
              <ul className="flex space-x-4">
                <li className="text-gray-500">Item 1</li>
                <li className="text-gray-500">Item 2</li>
                <li className="text-gray-500">Item 3</li>
                <li className="text-gray-500">Item 4</li>
              </ul>
            </div>
            <div className="flex items-center">
              <ul className="flex space-x-4">
                <li className="text-gray-500">Item 5</li>
                <li className="text-gray-500">Item 6</li>
                <li className="text-gray-500">Item 7</li>
                <li className="text-gray-500">Item 8</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
