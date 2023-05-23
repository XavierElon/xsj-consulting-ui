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
  // const [messages, setMessages] = useState<MessageInterface[]>([])
  const { conversations, setConversations, currentConversationID } = useContext(ChatStateContext)
  const [messages] = useChatListener(currentConversationID)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  useEffect(() => {
    getConversations()
  }, [])

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  // useEffect(() => {
  //   if (currentConversationID) {
  //     setupConversationListener()
  //   } else {
  //     setMessages([])
  //   }
  // }, [currentConversationID])

  const getConversations = async () => {
    const convos = await getConversationsForUser(id)
    setConversations(convos)
  }

  // const setupConversationListener = () => {
  //   if (currentConversationID) {
  //     const messagesRef = collection(doc(collection(db, 'conversations'), currentConversationID), 'messages')
  //     const messagesQuery = query(messagesRef, orderBy('createdAt'))

  //     const unsubscribe = onSnapshot(messagesQuery, (snapshot: any) => {
  //       const newMessages = snapshot.docs.map((doc: any) => ({
  //         id: doc.id,
  //         senderID: doc.data().senderID,
  //         text: doc.data().text,
  //         createdAt: doc.data().createdAt
  //       }))
  //       setMessages(newMessages.reverse())
  //     })

  //     return () => unsubscribe()
  //   }
  // }

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
