'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Message from './Message'
import { getUsersConversations } from '@/firebase/chat.firebase'
import useChatListener from '@/hooks/useChatListener'
import './ChatBox.css'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { setConversations, currentConversationID } = useContext(ChatStateContext)
  const messages = useChatListener(currentConversationID!)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  const updateConversations = async () => {
    const updatedConversations = await getUsersConversations(id)
    setConversations(updatedConversations)
  }

  const scrollToBottom = () => {
    console.log('scroll to bottom')
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    updateConversations()
  }, [])

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full pt-16">
      <div ref={messagesEndRef}></div>
      {messages.map((message: any) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

export default ChatBox
