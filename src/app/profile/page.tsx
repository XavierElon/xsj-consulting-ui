'use client'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import Layout from '@/components/Layout'
import Forbidden from '../forbidden/page'
import { AuthStateContext } from '@/context/AuthContext'
import { useAuthorization } from '@/hooks/useAuthorization'
import AccountTab from '@/components/tabs/AccounTab'

const Profile: NextPage = () => {
  const [accountSelected, setAccountSelected] = useState<boolean>(true)
  const [settingsSelected, setSettingsSelected] = useState<boolean>(false)
  const [paymentsSelected, setPaymentsSelected] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<any>(null)
  const authorized = useAuthorization()
  const { authState, getLoggedInUser } = useContext(AuthStateContext)

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

  const handleAccountTab = () => {
    setPaymentsSelected(false)
    setSettingsSelected(false)
    setAccountSelected(true)
  }

  const handleSettingsTab = () => {
    setPaymentsSelected(false)
    setAccountSelected(false)
    setSettingsSelected(true)
  }

  const handlePaymentsTab = () => {
    setSettingsSelected(false)
    setAccountSelected(false)
    setPaymentsSelected(true)
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
                  <ul className="flex h-full">
                    <li
                      className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                        accountSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={handleAccountTab}
                    >
                      Account
                    </li>
                    <li
                      className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                        settingsSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={handleSettingsTab}
                    >
                      Settings
                    </li>
                    <li
                      className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                        paymentsSelected ? 'bg-slate-200' : ''
                      }`}
                      onClick={handlePaymentsTab}
                    >
                      Payment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {accountSelected && (
              <>
                <AccountTab
                  imageUrl={imageUrl}
                  handleFileUpload={handleFileUpload}
                ></AccountTab>
              </>
            )}
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
