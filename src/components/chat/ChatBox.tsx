'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Message from './Message'
import { getUsersConversations, markMessageAsRead } from '@/firebase/chat.firebase'
import useChatListener from '@/hooks/useChatListener'
import './ChatBox.css'
import { checkIfMessageRead } from '@/utils/firebase.helpers'
import { MessageInterface } from '@/models/chat.interfaces'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { setConversations, currentConversationID, updateConversations } = useContext(ChatStateContext)
  const messages = useChatListener(currentConversationID!)
  const {
    authState: { id }
  } = useContext(AuthStateContext)
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
    <div className="flex flex-col-reverse overflow-y-auto h-full pt-16">
      <div ref={messagesEndRef}></div>
      {messages.map((message: any) => (
        <Message key={message.id} message={message} lastMessage={lastMessage} />
      ))}
    </div>
  )
}

export default ChatBox
