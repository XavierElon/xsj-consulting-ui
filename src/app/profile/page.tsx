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
  const [accountSelected, setAccountSelected] = useState<boolean>(true)
  const [settingsSelected, setSettingsSelected] = useState<boolean>(false)
  const [paymentsSelected, setPaymentsSelected] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<any>(null)
  const authorized = useAuthorization()
  const { authState, getLoggedInUser } = useContext(AuthStateContext)
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
        getLoggedInUser(id)
      } catch (error) {
        console.log(error)
      }
    }
    sendImage()
  }, [file, getLoggedInUser])

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
            <div className="w-full bg-slate-100 py-4 mt-16 border-t-[#79589F] border-t-4">
              <div className="container mx-auto">
                <div className="w-5/6 ml-auto">
                  <p className="text-md text-[#323B49]">Manage Account</p>
                </div>
              </div>
            </div>

            <div className="w-full bg-white mr-10 border-t-slate-200 border-b-slate-200 border-t-2 border-b-2">
              <div className="container mx-auto ">
                <div className="w-5/6 ml-auto">
                  <ul className="flex items-stretch space-x-8 h-full">
                    <li
                      className={`text-gray-500 text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-2 ${
                        settingsSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={() => setAccountSelected(true)}
                    >
                      Account
                    </li>
                    <li
                      className={`text-gray-500 text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-2 ${
                        accountSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={() => setSettingsSelected(true)}
                    >
                      Settings
                    </li>
                    <li
                      className={`text-gray-500 text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-2 ${
                        paymentsSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={() => setPaymentsSelected(true)}
                    >
                      Payment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mx-auto bg-white min-h-screen min-w-screen">
              <div className="flex flex-col h-full w-full container mx-auto">
                <div className="w-5/6 ml-auto">
                  <div className="flex mb-4 pt-20">
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
