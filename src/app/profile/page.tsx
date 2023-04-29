'use client'
import {
  ChangeEvent,
  CSSProperties,
  useContext,
  useEffect,
  useState,
} from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import Layout from '@/components/Layout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { auth } from '@/firebase/firebase'
import { signOut } from 'firebase/auth'
import Forbidden from '../forbidden/page'
import { AuthStateContext } from '@/context/AuthContext'
import { useAuthorization } from '@/hooks/useAuthorization'

const Profile: NextPage = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const { authState } = useContext(AuthStateContext)
  const { email } = authState.user
  const { provider } = authState

  const authorized = useAuthorization()

  // useEffect(() => {
  //   // handleUpload()
  // }, [file])

  if (authorized === null) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
    )
  }

  const handleFileChange = async (event: any) => {
    // event.preventDefault()
    console.log(event.target.files)
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
      await handleUpload()
    }
  }

  const handleUpload = async () => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('profilePicture', file)

    console.log(formData.get('profilePicture'))
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
                    {provider === 'firebaseGoogle' ? (
                      <>
                        <img
                          src={authState.user?.photoURL || ''}
                          width="100"
                          height="100"
                          referrerPolicy="no-referrer"
                          className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer"
                        ></img>
                      </>
                    ) : (
                      <>
                        <div
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className="relative"
                        >
                          <AccountCircleIcon
                            fontSize="inherit"
                            color="primary"
                            sx={{ fontSize: '100px' }}
                          ></AccountCircleIcon>

                          <>
                            <form onSubmit={handleUpload}>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileInput"
                              ></input>

                              <label htmlFor="fileInput">
                                {isHovering && (
                                  <FileUploadIcon
                                    fontSize="inherit"
                                    color="primary"
                                    sx={{
                                      fontSize: '40px',
                                      position: 'absolute',
                                      top: '80%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)',
                                      backgroundColor: 'white',
                                      borderRadius: '50px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                )}
                              </label>
                              {/* <button className="bg-black" type="submit">
                                Upload
                              </button> */}
                            </form>
                          </>
                        </div>
                      </>
                    )}

                    <div className="flex flex-col ml-4">
                      <p className="font-bold text-black text-3xl mb-1">
                        {email}
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
                    {provider === 'local' && (
                      <Link href="/profile/settings/changepassword">
                        <p className="text-black">Change Password</p>
                      </Link>
                    )}
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
