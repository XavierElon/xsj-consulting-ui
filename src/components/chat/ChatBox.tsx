'use client'
import { collection, doc, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { db } from '@/firebase/firebase'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { MessageInterface } from '@/models/chat.interfaces'
import Message from './Message'
import { useAuthorization } from '@/hooks/useAuthorization'
import SendMessage from './SendMessage'
import { getConversationsForUser, getMessagesForConversation } from '@/firebase/chat.firebase'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const { currentUserID, setCurrentUserID, conversations, setConversations, currentConversationID } = useContext(ChatStateContext)
  const authorized = useAuthorization()
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  useEffect(() => {
    getConversations()
    setCurrentUserID(id)
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  useEffect(() => {
    if (currentConversationID) {
      getMessages(currentConversationID)
    } else {
      setMessages([])
    }
  }, [currentConversationID])

  const getConversations = async () => {
    const convos = await getConversationsForUser(id)
    setConversations(convos)
  }

  const getMessages = async (conversationID: string) => {
    // const currentMessages = await getMessagesForConversation(conversationID)
    // setMessages(currentMessages)
    setupConversationListener()
  }

  const setupConversationListener = () => {
    if (currentConversationID) {
      const messagesRef = collection(doc(collection(db, 'conversations'), currentConversationID), 'messages')
      const messagesQuery = query(messagesRef, orderBy('createdAt'))

      const unsubscribe = onSnapshot(messagesQuery, (snapshot: any) => {
        const newMessages = snapshot.docs.map((doc: any) => ({
          senderID: doc.data().senderID,
          text: doc.data().text,
          createdAt: doc.data().createdAt
        }))
        setMessages(newMessages.reverse())
      })

      // Cleanup function
      return () => unsubscribe()
    }
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
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      {/* <div className="w-1/4 flex flex-col"></div> */}
    </div>
  )
}

export default ChatBox
