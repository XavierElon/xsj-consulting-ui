'use client'
import React from 'react'
import Link from 'next/link'
import { CgMenuGridR } from 'react-icons/cg'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

type Props = {
  open: boolean
  handleClick(): void
}

const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        'text-zinc-500': true, // colors
        'flex items-center': true, // layout
        'w-full fixed z-10 px-4 h-16': true, //positioning & styling
      })}
    >
      {props.open ? (
        <button onClick={props.handleClick} className="z-50">
          <XMarkIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex flex-col justify-start px-10">
          <button onClick={props.handleClick}>
            <CgMenuGridR className="h-6 w-6" />
          </button>
        </div>
      )}
      <Link href="/">
        <div className="flex flex-col justify-start font-bold text-lg text-white px-5">
          DevGru
        </div>
      </Link>
      <div className="flex-grow"></div>

      <div className="flex flex-col justify-end px-10">
        <Link href="/login">
          <Button
            variant="light"
            className="bg-slate-50 hover:bg-slate-200 px-2 py-2 rounded-lg text-black"
          >
            Login
          </Button>
        </Link>
      </div>
      <div className="flex flex-col justify-end px-10">
        <Link href="/signup">
          <Button
            variant="primary"
            className="bg-sky-400 hover:bg-sky-600 px-2 py-2 rounded-lg text-white"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
