'use client'
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import { db } from '@/firebase/firebase'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { MessageInterface } from '@/models/chat.interfaces'
import Message from './Message'
import { useAuthorization } from '@/hooks/useAuthorization'
import SendMessage from './SendMessage'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const { conversations, setConversations, getFirebaseUserConversations } = useContext(ChatStateContext)
  const authorized = useAuthorization()
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  useEffect(() => {
    const id: any = sessionStorage.getItem('id')
    const getConversations = async () => {
      const convos = await getFirebaseUserConversations(id)
      console.log(convos)
      setConversations(convos)
      setMessages(convos[0].messages)
      console.log(messages)
    }
    getConversations()
  }, [getFirebaseUserConversations])

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="pl-20 pt-16 pb-10 flex-grow overflow-y-auto" style={messagesContainer}>
        {messages.map((message, idx) => (
          <Message key={idx} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  )
}

export default ChatBox

const messagesContainer: CSSProperties = {
  maxHeight: '90%',
  overflowY: 'auto'
}
