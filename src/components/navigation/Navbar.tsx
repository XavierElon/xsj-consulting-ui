'use client'
import React, { CSSProperties } from 'react'
import Link from 'next/link'
import { CgMenuGridR } from 'react-icons/cg'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

type Props = {
  open: boolean
  handleClick(): void
}

const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        'text-black bg-white border-b-1 border-slate-300 shadow-md': true, // colors
        'flex items-center': true, // layout
        'w-full fixed z-50 px-4 h-16': true, //positioning & styling
      })}
    >
      {props.open ? (
        <button onClick={props.handleClick} className="z-50">
          <XMarkIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex flex-col justify-start px-10">
          <button onClick={props.handleClick}>
            <CgMenuGridR className="h-10 w-10" />
          </button>
        </div>
      )}
      <Link href="/">
        <div className="flex flex-col justify-start font-bold text-lg text-black px-5">
          DevGru
        </div>
      </Link>
      <div className="flex-grow"></div>

      <div className="flex flex-col justify-end mx-5">
        <Link href="/login">
          <Button
            variant="light"
            className="bg-slate-50 hover:bg-slate-200 transform hover:scale-110 transition-all duration-300 px-2 py-2 rounded-lg text-black"
            style={buttonStyle}
          >
            Login
          </Button>
        </Link>
      </div>
      <div className="flex flex-col justify-end mx-5">
        <Link href="/signup">
          <Button
            variant="primary"
            className="bg-[#0069FF] hover:bg-[#022cac] transform hover:scale-110 transition-all duration-300 px-2 py-2 rounded-lg text-white"
            style={buttonStyle}
          >
            Sign up
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

const buttonStyle: CSSProperties = {
  width: '86px',
  height: '40px',
}
