'use client'
import { CSSProperties, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'
import Forbidden from '../forbidden/page'

const Profile: NextPage = () => {
  const [user] = useAuthState(auth)
  console.log(user)
  // const {
  //   metadata: { creationTime },
  // } = user!
  const displayName: string = user?.displayName
  const email: string = user?.email
  const photoURL: string = user?.photoURL
  const creationTime = user?.metadata.creationTime
  const [day, date, month, year]: any = creationTime?.split(' ').slice(0, 4)
  const formattedDate = `${day} ${date} ${month} ${year}`
  // console.log(formattedDate)

  console.log(user)

  return (
    <>
      {user ? (
        <>
          <Layout>
            <div className="flex items-center justify-start min-h-screen pt-16">
              <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                <div className="relative w-4/5 bg-white border-none flex items-center">
                  <img
                    src={photoURL || ''}
                    width="100"
                    height="100"
                    className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer display-block"
                  ></img>
                  <div className="flex flex-col mr-2 mx-4">
                    <p className="font-bold text-black text-3xl mr-2 mx-4 display-block">
                      {email}
                    </p>
                    <p className="text-slate-500 text-lg mx-4">
                      Member since {formattedDate}
                    </p>
                  </div>
                  <div className="flex mr-2 mx-4">
                    <p className="font-bold text-black text-3xl mr-2 mx-4">
                      Sign-in method
                    </p>
                    <p className="text-slate-500 text-lg mx-4">
                      Member since {formattedDate}
                    </p>
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

export default Profile

const submitButtonStyle: CSSProperties = {
  width: '20%',
  height: '4%',
  paddingTop: '2%',
  paddingBottom: '2%',
}
//
