'use client'
import { AuthStateContext } from '@/context/AuthContext'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Forbidden from '@/app/forbidden/page'
import Layout from '@/components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

const ProfileSettings = () => {
  const [user] = useAuthState(auth)
  const { authState } = useContext(AuthStateContext)
  const { email } = authState.user

  const authorized = useAuthorization()

  if (authorized === null) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
        {/* <div className="text-black">Loading...</div> */}
      </div>
    )
  }

  return (
    <>
      {authorized ? (
        <>
          <Layout>
            <div className="flex items-center justify-start min-h-screen pt-16">
              <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                <div className="relative w-4/5 bg-white border-none flex flex-wrap flex-col items-start">
                  <div className="flex items-center mr-2">
                    {authState.provider === 'firebaseGoogle ' ? (
                      <>
                        <Image
                          src={user?.photoURL || ''}
                          width="50"
                          height="50"
                          referrerPolicy="no-referrer"
                          alt="profilePicture"
                          className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer"
                        ></Image>
                      </>
                    ) : (
                      <>
                        <AccountCircleIcon
                          fontSize="inherit"
                          color="primary"
                          sx={{ fontSize: '100px' }}
                        ></AccountCircleIcon>
                      </>
                    )}
                    <div className="flex flex-col ml-4">
                      <p className="font-bold text-black text-3xl mb-1">
                        {email}
                      </p>
                      <p className="text-slate-500 text-lg">
                        Member since unknown
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 px-24">
                    <p className="font-bold text-black text-3xl mr-2">
                      Sign-in method:
                    </p>
                    <p className="text-slate-500 text-xl mx-2">
                      {authState.provider.charAt(0).toUpperCase() +
                        authState.provider.slice(1)}
                    </p>
                    <Link href="/profile/settings/changepassword">
                      <p className="text-black">Change Password</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </>
      ) : (
        <>
          <Forbidden />
        </>
      )}
    </>
  )
}

export default ProfileSettings
