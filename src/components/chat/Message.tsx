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
  const { id, username } = authState
  const { secondUser, secondUserID } = useContext(ChatStateContext)
  const isChatGPT: boolean = message.message.senderID === 'chatGPT-3.5'
  const isSecondUser: boolean = message.message.senderID !== id

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
    <div className="">
      <div className={`chat ${isSecondUser ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {isChatGPT ? (
              <BoltIcon style={{ color: 'purple', fontSize: '40px' }}></BoltIcon>
            ) : imageUrl ? (
              <Image alt="profilePicture" width="15" height="15" src={imageUrl} />
            ) : (
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
            )}
          </div>
        </div>
        <div className="chat-header text-black">
          {isChatGPT ? 'Chat GPT' : isSecondUser ? 'Achilles' : username}
          <time className="text-xs opacity-75 ml-2">12:45</time>
        </div>
        <div className="chat-details flex-grow">
          <div className={`flex ${!isSecondUser ? 'justify-end' : ''}`}>
            <div className={`chat-bubble text-white ${!isSecondUser ? 'bg-blue-500' : 'bg-gray-400'}`}>{message.message.text}</div>
          </div>
        </div>
        <div className="chat-footer opacity-75">Delivered</div>
      </div>
    </div>
  )
}

export default Message
