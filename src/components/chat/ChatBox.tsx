'use client'
import { collection, doc, query, onSnapshot, orderBy } from 'firebase/firestore'
import { useContext, useEffect, useRef, useState } from 'react'
import { db } from '@/firebase/firebase'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { MessageInterface } from '@/models/chat.interfaces'
import Message from './Message'
import { getConversationsForUser } from '@/firebase/chat.firebase'
import useChatListener from '@/hooks/useChatListener'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { conversations, setConversations, currentConversationID } = useContext(ChatStateContext)
  const [messages] = useChatListener(currentConversationID!)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  useEffect(() => {
    getConversations()
  }, [])

  const getConversations = async () => {
    const convos = await getConversationsForUser(id)
    setConversations(convos)
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col-reverse">
        <div className="pl-20 pt-16 pb-10 flex-none flex flex-col-reverse">
          {messages.map((message: any) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
