'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import { formatDate } from '@/utils/date.helpers'
import { checkIfMessageRead } from '@/utils/firebase.helpers'
import { MessageInterface } from '@/models/chat.interfaces'
import useProfilePic from '@/hooks/useProfilePic'
import CursorSVG from '../icons/CursorSVG'

interface MessageProps {
  message: MessageInterface
  lastMessage: MessageInterface | null
  showDate: boolean
}

const Message = (props: MessageProps) => {
  const { message, lastMessage, showDate } = props
  const [displayResponse, setDisplayResponse] = useState('')
  const [completedTyping, setCompletedTyping] = useState(false)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState
  const profilePicture = useProfilePic(message)

  const isChatGPT: boolean = message?.senderID === 'chatGPT-3.5'
  const isSecondUser: boolean = message?.senderID !== id
  const isLastMessageRead = checkIfMessageRead(message)
  const isLastMessage: boolean = message.id === lastMessage?.id

  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  let formattedTime
  let formattedReadTime
  let date
  let formattedDate

  if (message?.createdAt) {
    formattedTime = new Intl.DateTimeFormat('default', timeOptions).format(message.createdAt.toDate())
    date = message.createdAt.toDate()
    formattedDate = formatDate(date)
  }

  if (message?.readTime) {
    formattedReadTime = new Intl.DateTimeFormat('default', timeOptions).format(message.readTime.toDate())
  }

  useEffect(() => {
    if (isChatGPT && isLastMessage) {
      setCompletedTyping(false)
      let i = 0
      const intervalId = setInterval(() => {
        setDisplayResponse(message.text.slice(0, i))
        i++
        if (i > message.text.length) {
          clearInterval(intervalId)
          setCompletedTyping(true)
        }
      }, 30)

      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="">
      {showDate && <div style={{ display: 'flex', justifyContent: 'center' }}>{formattedDate}</div>}
      <div className={`chat ${isSecondUser ? 'chat-start' : 'chat-end'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {isChatGPT ? (
              <BoltIcon style={{ color: 'purple', fontSize: '40px' }}></BoltIcon>
            ) : profilePicture ? (
              <Image alt="profilePicture" width="15" height="15" src={profilePicture} />
            ) : (
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
            )}
          </div>
        </div>
        <div className="chat-header text-black">
          {isChatGPT ? 'Chat GPT' : message.username}
          <time className="text-xs opacity-75 ml-2">{formattedTime}</time>
        </div>
        <div className="chat-details flex-grow">
          <div className={`flex ${!isSecondUser ? 'justify-end' : ''}`}>
            <div className={`chat-bubble text-white whitespace-pre-line ${!isSecondUser ? 'bg-blue-500' : 'bg-gray-400'}`}>
              {isChatGPT && isLastMessage ? (
                <div>
                  {displayResponse}
                  {!completedTyping && <CursorSVG />}
                </div>
              ) : (
                message?.text
              )}
            </div>
          </div>
        </div>
        {!isSecondUser && !isChatGPT && isLastMessageRead && isLastMessage ? (
          <div className="chat-footer opacity-75">Read {formattedReadTime}</div>
        ) : (
          !isSecondUser && isLastMessage && <div className="chat-footer opacity-75">Delivered</div>
        )}
      </div>
    </div>
  )
}

export default Message
