'use client'
import { CSSProperties, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'
import Forbidden from '../forbidden/page'

const Profile: NextPage = () => {
  const [user] = useAuthState(auth)
  const displayName: string = user?.displayName
  const email: string = user?.email
  const photoURL: string = user?.photoURL
  const creationTime = user?.metadata.creationTime
  let [day, date, month, year]: string[] = ['', '', '', '']
  // console.log(creationTime)
  if (creationTime) {
    ;[day, date, month, year] = creationTime?.split(' ').slice(0, 4)
  }

  const formattedDate = `${day} ${date} ${month} ${year}`
  console.log(formattedDate)

  console.log(user)

  return (
    <>
      {user ? (
        <>
          <Layout>
            <div className="flex items-center justify-start min-h-screen pt-16">
              <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                <div className="relative w-4/5 bg-white border-none flex flex-wrap flex-col items-start">
                  <div className="flex items-center mr-2">
                    <img
                      src={photoURL || ''}
                      width="100"
                      height="100"
                      className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer display-block"
                    />
                    <div className="flex flex-col ml-4">
                      <p className="font-bold text-black text-3xl mb-1">
                        {email}
                      </p>
                      <p className="text-slate-500 text-lg">
                        Member since {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 px-24">
                    <p className="font-bold text-black text-3xl mr-2">
                      Sign-in method
                    </p>
                    <p className="text-slate-500 text-lg">Google</p>
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
