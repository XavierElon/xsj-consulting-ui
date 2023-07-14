'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import { formatDate } from '@/utils/date.helpers'
import { checkIfMessageRead } from '@/utils/firebase.helpers'

interface MessageProps {
  message: any
  lastMessage: any
}

const Message = (props: MessageProps) => {
  const { message, lastMessage } = props
  const [imageUrl, setImageUrl] = useState<string>('')
  const { authState } = useContext(AuthStateContext)
  const { id } = authState
  const { secondUser, secondUserID } = useContext(ChatStateContext)

  const isChatGPT: boolean = message?.senderID === 'chatGPT-3.5'
  const isSecondUser: boolean = message?.senderID !== id
  const isLastMessageRead = checkIfMessageRead(message)
  const isLastMessage: boolean = message.id === lastMessage?.id

  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  let formattedTime
  let date
  let formattedDate

  if (message?.createdAt) {
    formattedTime = new Intl.DateTimeFormat('default', timeOptions).format(message.createdAt.toDate())
    date = message.createdAt.toDate()
    formattedDate = formatDate(date)
  }

  useEffect(() => {
    const getProfilePic = async () => {
      setImageUrl('')

      if (message?.senderID === secondUserID) {
        if (Object.keys(secondUser.profilePicture).length !== 0) {
          if (secondUser.provider === 'firebaseGoogle' && secondUser.profilePicture) {
            setImageUrl(secondUser.profilePicture)
          } else {
            setImageUrl(secondUser.profilePicture.url)
          }
        }
      } else if (message.senderID === localStorage.getItem('id')) {
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
          {isChatGPT ? 'Chat GPT' : message.username}
          <time className="text-xs opacity-75 ml-2">
            {formattedDate} {formattedTime}
          </time>
        </div>
        <div className="chat-details flex-grow">
          <div className={`flex ${!isSecondUser ? 'justify-end' : ''}`}>
            <div className={`chat-bubble text-white ${!isSecondUser ? 'bg-blue-500' : 'bg-gray-400'}`}>{message?.text}</div>
          </div>
        </div>
        {!isSecondUser && !isChatGPT && isLastMessageRead && isLastMessage ? (
          <div className="chat-footer opacity-75">Read</div>
        ) : (
          !isSecondUser && isLastMessage && <div className="chat-footer opacity-75">Delivered</div>
        )}
      </div>
    </div>
  )
}

export default Message
