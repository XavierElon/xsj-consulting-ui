'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext, ChatStateContext } from '@/context'
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

const Message = ({ message, lastMessage, showDate }: MessageProps) => {
  const {
    authState: { id }
  } = useContext(AuthStateContext)
  const { isChatGPTMessageLoading } = useContext(ChatStateContext)

  const [displayResponse, setDisplayResponse] = useState('')
  const [completedTyping, setCompletedTyping] = useState(false)

  const profilePicture = useProfilePic(message)

  const isChatGPT: boolean = message?.senderID === 'chatGPT-3.5'
  const isSecondUser: boolean = message?.senderID !== id
  const isLastMessageRead = checkIfMessageRead(message)
  const isLastMessage: boolean = message.id === lastMessage?.id

  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  let formattedTime: any
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

  const simulateTypingEffect = (text: string) => {
    setCompletedTyping(false)
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayResponse(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(intervalId)
        setCompletedTyping(true)
      }
    }, 30)

    return () => clearInterval(intervalId)
  }

  useEffect(() => {
    if (isChatGPT && isLastMessage) {
      simulateTypingEffect(message.text)
    }
  }, [message, isLastMessage, isChatGPTMessageLoading])

  return (
    <div className="w-full">
      {showDate && <div style={{ display: 'flex', justifyContent: 'center' }}>{formattedDate}</div>}
      <div className={`chat overflow-x-hidden ${isSecondUser ? 'chat-start' : 'chat-end'}`}>
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
        <div className="chat-details overflow-x-hidden flex-grow">
          <div className={`flex ${!isSecondUser ? 'justify-end' : ''}`}>
            <div>
              {isChatGPT && isLastMessage ? (
                <div className={`chat-bubble text-white overflow text-clip ${!isSecondUser ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  {displayResponse}
                  {!completedTyping && <CursorSVG />}
                </div>
              ) : (
                <div className={`chat-bubble text-white overflow whitespace-pre text-clip ${!isSecondUser ? 'bg-blue-500 mr-8' : 'mr-8 bg-gray-400'}`}>{message?.text}</div>
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
