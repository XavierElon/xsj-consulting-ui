'use client'
import { CSSProperties, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Layout from '@/components/Layout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Forbidden from '../forbidden/page'
import { AuthStateContext } from '@/context/AuthContext'
import { useAuthorization } from '@/hooks/useAuthorization'

const Profile: NextPage = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<any>(null)
  const authorized = useAuthorization()
  const { authState } = useContext(AuthStateContext)
  const { email } = authState.user
  const { provider } = authState

  useEffect(() => {
    if (authState.provider === 'local') {
      const imageBuffer = authState.user.profilePicture.data.data
      const imageType = authState.user.profilePicture.contentType
      const base64String = Buffer.from(imageBuffer).toString('base64')

      const url = `data:${imageType};base64,${base64String}`
      setImageUrl(url)
    }
  }, [authState])

  useEffect(() => {
    if (!file) {
      return
    }
    const sendImage = async () => {
      try {
        const formData = new FormData()
        formData.append('image', file)
        const id = localStorage.getItem('id')

        await axios.post(
          `http://localhost:1017/upload-profile-picture/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
    sendImage()
  }, [file])

  const handleFileUpload = async (event: any) => {
    console.log(event.target.files)
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
    }
  }

  if (authorized === null) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
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
                          {imageUrl ? (
                            <>
                              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                <img
                                  src={imageUrl}
                                  alt="profilePicture"
                                  className="w-full h-full rounded-full"
                                ></img>
                              </div>
                            </>
                          ) : (
                            <AccountCircleIcon
                              fontSize="inherit"
                              color="primary"
                              sx={{ fontSize: '100px' }}
                            ></AccountCircleIcon>
                          )}

                          <>
                            <form>
                              <input
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={handleFileUpload}
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
