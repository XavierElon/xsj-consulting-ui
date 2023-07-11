'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BoltIcon from '@mui/icons-material/Bolt'

const Message = (message: any) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const { authState } = useContext(AuthStateContext)
  const { secondUser, secondUserID } = useContext(ChatStateContext)
  const isChatGPT: boolean = message.message.senderID === 'chatGPT-3.5'

  useEffect(() => {
    const getProfilePic = async () => {
      setImageUrl('')

      if (message.message.senderID === secondUserID) {
        if (Object.keys(secondUser.profilePicture).length !== 0) {
          if (secondUser.provider === 'firebaseGoogle' && secondUser.profilePicture) {
            setImageUrl(secondUser.profilePicture)
          } else {
            setImageUrl(secondUser.profilePicture.url)
          }
        }
      } else if (message.message.senderID === localStorage.getItem('id')) {
        if (authState.provider === 'local' && authState.user.profilePicture) {
          setImageUrl(authState.user.profilePicture.url)
        } else if (authState.provider === 'firebaseGoogle' && authState.user.photoURL) {
          setImageUrl(authState.user.photoURL)
        }
      }
    }

    getProfilePic()
  }, [message, secondUser, secondUserID])

  return (
    <div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full mr-2">
            {isChatGPT ? (
              <BoltIcon style={{ color: 'purple', fontSize: '40px' }}></BoltIcon>
            ) : imageUrl ? (
              <Image alt="profilePicture" width="15" height="15" src={imageUrl} />
            ) : (
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
            )}
          </div>
        </div>
        <div className="chat-details">
          {/* <div className="mt-4 chat-header font-sm text-black"></div> */}
          <div className="flex flex-wrap">
            <div className=" pr-6 chat-bubble chat-bubble-primary text-white">{message.message.text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
