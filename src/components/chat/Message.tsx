'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Image from 'next/image'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Message = (message: any) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const { authState } = useContext(AuthStateContext)
  const { secondUser, secondUserID, senderID } = useContext(ChatStateContext)

  const {
    authState: {
      user: { email }
    }
  } = useContext(AuthStateContext)

  useEffect(() => {
    console.log(message)
  }, [])

  // useEffect(() => {
  //   console.log(secondUser)
  //   console.log(secondUserID)
  //   console.log(senderID)
  // }, [secondUser, secondUserID, senderID])

  useEffect(() => {
    const getProfilePic = async () => {
      console.log(secondUserID)
      if (message.message.senderID === secondUserID) {
        console.log(secondUser)
        setImageUrl(secondUser.profilePicture)
      } else if (message.message.senderID === sessionStorage.getItem('id')) {
        if (authState.provider === 'local' && authState.user.profilePicture) {
          setImageUrl(authState.user.profilePicture.url)
        } else if (authState.provider === 'firebaseGoogle' && authState.user.photoURL) {
          setImageUrl(authState.user.photoURL)
        }
      } else {
        console.log('else')
      }
    }

    getProfilePic()
  }, [])

  // useEffect(() => {
  //   if (authState.provider === 'local' && authState.user.profilePicture) {
  //     setImageUrl(authState.user.profilePicture.url)
  //   } else if (authState.provider === 'firebaseGoogle' && authState.user.photoURL) {
  //     setImageUrl(authState.user.photoURL)
  //   }
  // }, [authState])

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
          <div className="mt-4 chat-header font-sm text-black">{username}</div>
          <div className="flex flex-wrap">
            <div className=" pr-6 chat-bubble bg-blue-500 text-white">{message.message.text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
