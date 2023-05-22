'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Message = (message: any) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const { authState } = useContext(AuthStateContext)

  const {
    authState: {
      user: { email }
    }
  } = useContext(AuthStateContext)

  // useEffect(() => {
  //   console.log(authState)
  // }, [])

  useEffect(() => {
    if (authState.provider === 'local' && authState.user.profilePicture) {
      setImageUrl(authState.user.profilePicture.url)
    } else if (authState.provider === 'firebaseGoogle' && authState.user.photoURL) {
      setImageUrl(authState.user.photoURL)
    }
  }, [authState])

  return (
    <div>
      <div className="flex items-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full mr-2">
            {imageUrl ? (
              <Image alt="profilePicture" width="15" height="15" src={imageUrl} />
            ) : (
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }}></AccountCircleIcon>
            )}
          </div>
        </div>
        <div className="chat-details">
          <div className="mt-4 chat-header font-sm text-black">{email}</div>
          <div className="flex flex-wrap">
            <div className=" pr-6 chat-bubble bg-blue-500 text-white">{message.message.text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
