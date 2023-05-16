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

  useEffect(() => {
    if (authState.provider === 'local' && authState.user.profilePicture) {
      const imageBuffer = authState.user.profilePicture.data.data
      const imageType = authState.user.profilePicture.contentType
      const base64String = Buffer.from(imageBuffer).toString('base64')

      const url = `data:${imageType};base64,${base64String}`
      setImageUrl(url)
    }
  }, [authState])

  console.log(message)
  console.log(message.message.text)
  return (
    <div>
      <div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {imageUrl ? (
              <Image alt="profilePicture" width="15" height="15" src={imageUrl} />
            ) : (
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }}></AccountCircleIcon>
            )}
          </div>
        </div>
        <div className="chat-header text-black">{email}</div>
        <div className="chat-bubble bg-blue-500 text-white">{message.message.text}</div>
      </div>
    </div>
  )
}

export default Message
