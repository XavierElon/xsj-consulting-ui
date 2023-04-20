'use client'
import { CSSProperties, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

const Profile: NextPage = () => {
  const [user] = useAuthState(auth)
  console.log(user)

  const [user2, setUser2] = useState(user)

  const handleSignout = async (e: any) => {
    try {
      await auth.signOut()
      console.log('User has been signed out')
      console.log(user)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('user changed')
  }, [user2])

  return (
    <>
      {user ? (
        <>
          <Layout>
            <button
              type="submit"
              className="text-white bg-[#0061EB] hover:bg-[#022cac] rounded-lg my-7 mx-10"
              style={submitButtonStyle}
              onClick={handleSignout}
            >
              Log Out
            </button>
          </Layout>
        </>
      ) : (
        <>
          <h1 className="text-white">Forbidden</h1>
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
