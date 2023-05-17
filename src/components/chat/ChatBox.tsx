'use client'
import { collection, doc, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import { db } from '@/firebase/firebase'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { MessageInterface } from '@/models/chat.interfaces'
import Message from './Message'
import { useAuthorization } from '@/hooks/useAuthorization'
import SendMessage from './SendMessage'
import { getConversationsForUser } from '@/firebase/chat.firebase'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const { conversations, setConversations, getFirebaseUserConversations } = useContext(ChatStateContext)
  const authorized = useAuthorization()
  const { authState } = useContext(AuthStateContext)

  useEffect(() => {
    const id: any = sessionStorage.getItem('id')

    const getConversations = async () => {
      console.log(id)
      const convos = await getConversationsForUser(id)
      console.log('convos')
      console.log(convos)
      setConversations(convos)
      if (convos[0]) {
        const conversationId = convos[0].id
        console.log(conversationId)
        const messagesRef = collection(doc(collection(db, 'conversations'), conversationId), 'messages')
        const messagesQuery = query(messagesRef, orderBy('createdAt'))

        const unsubscribe = onSnapshot(messagesQuery, (snapshot: any) => {
          const newMessages = snapshot.docs.map((doc: any) => ({
            senderID: doc.data().senderID,
            text: doc.data().text,
            createdAt: doc.data().createdAt
          }))
          console.log(newMessages)
          setMessages(newMessages)
        })

        // Cleanup function
        return () => unsubscribe()
      }
    }

    getConversations()
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])

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
