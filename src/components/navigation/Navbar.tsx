'use client'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { CgMenuGridR } from 'react-icons/cg'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AuthStateContext } from '@/context/AuthContext'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuthorization } from '@/hooks/useAuthorization'

type Props = {
  open: boolean
  handleClick(): void
}

const Navbar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [user] = useAuthState(auth)
  const { authState } = useContext(AuthStateContext)
  const router = useRouter()
  const authorized = useAuthorization()
  const {
    provider,
    user: { firstName, lastName },
  } = authState

  const handleLogout = async () => {
    try {
      if (provider === 'firebaseGoogle') {
        await signOut(auth)
      }
      axios
        .post('http://localhost:1017/logout')
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      localStorage.clear()

      window.location.assign('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDropdownOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

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
      {!authorized && (
        <div className="flex">
          <div className="justify-end mx-5">
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
          <div className="justify-end mx-5">
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
        </div>
      )}
      {authorized && (
        <div>
          <div className="flex justify-end items-center">
            {authState.provider === 'firebaseGoogle' ? (
              <>
                <p className="text-black mr-2">{user?.displayName}</p>
                <img
                  src={authState?.user.photoURL || ''}
                  width="50"
                  height="50"
                  className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer"
                  onClick={handleDropdownOpen}
                ></img>
              </>
            ) : (
              <>
                <p className="text-black mr-2">
                  {firstName} {lastName}
                </p>
                <AccountCircleIcon
                  fontSize="inherit"
                  color="primary"
                  sx={{ fontSize: '50px' }}
                  onClick={handleDropdownOpen}
                ></AccountCircleIcon>
              </>
            )}
            <ExpandMoreIcon
              className=" transform hover:scale-150 transition-all duration-300"
              onClick={handleDropdownOpen}
            ></ExpandMoreIcon>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDropdownClose}
            >
              <MenuItem onClick={() => router.push('/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push('/profile/settings')}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

const buttonStyle: CSSProperties = {
  width: '86px',
  height: '40px',
}
