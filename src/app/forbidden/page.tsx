import React from 'react'
import Link from 'next/link'

const Forbidden = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-white ">Forbidden</h1>
        <Link href="/">
          <h4 className="text-white">Return Home</h4>
        </Link>
      </div>
    </div>
  )
}

export default Forbidden
