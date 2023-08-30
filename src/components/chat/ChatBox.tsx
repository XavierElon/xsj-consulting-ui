'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Message from './Message'
import { markMessageAsRead } from '@/firebase/chat.firebase'
import useChatListener from '@/hooks/useChatListener'
import './ChatBox.css'
import { checkIfMessageRead } from '@/utils/firebase.helpers'
import { MessageInterface } from '@/models/chat.interfaces'
import { ThreeDots } from 'react-loader-spinner'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentConversationID, updateConversations } = useContext(ChatStateContext)
  const messages = useChatListener(currentConversationID!)
  const {
    authState: { id }
  } = useContext(AuthStateContext)
  const { isChatGPTMessageLoading } = useContext(ChatStateContext)
  const [lastMessage, setLastMessage] = useState<MessageInterface | null>(null)

  let isLastMessageRead: boolean | undefined = false

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const updateLastMessageToRead = async () => {
    if (messages) {
      const newLastMessage = messages[0]
      setLastMessage(newLastMessage)
    }
    if (lastMessage && lastMessage.senderID !== id) {
      isLastMessageRead = checkIfMessageRead(lastMessage)
      if (!isLastMessageRead) {
        await markMessageAsRead(currentConversationID!, lastMessage.id!, lastMessage.senderID)
        isLastMessageRead = true
      }
    }
  }

  useEffect(() => {
    updateConversations()
    console.log(messages)
    updateLastMessageToRead()
  }, [currentConversationID, messages, lastMessage])

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full pt-16 pb-2">
      <div ref={messagesEndRef}></div>
      <div className="mb-8 ml-12">{isChatGPTMessageLoading && <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" visible={true} />}</div>
      {messages.map((message: any, index: number) => {
        let showDate = true
        if (index < messages.length - 1) {
          const currentDate = new Date(message.createdAt.seconds * 1000)
          const nextDate = new Date(messages[index + 1].createdAt.seconds * 1000)

          showDate = !(currentDate.getDate() === nextDate.getDate() && currentDate.getMonth() === nextDate.getMonth() && currentDate.getFullYear() === nextDate.getFullYear())
        }

        return <Message key={message.id} message={message} lastMessage={lastMessage} showDate={showDate} />
      })}
    </div>
  )
}

export default ChatBox
