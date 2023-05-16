'use client'
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { useContext, useEffect, useRef, useState } from 'react'
import { db } from '@/firebase/firebase'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { MessageInterface } from '@/models/chat.interfaces'
import Message from './Message'
import { useAuthorization } from '@/hooks/useAuthorization'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
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
  }, [])

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(scrollToBottom, [messages])

  //   useEffect(() => {
  //     const q = query(
  //       collection(db, "messages"),
  //       orderBy("createdAt"),
  //       limit(50),
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const messages = [];
  //       querySnapshot.forEach((doc) => {
  //         messages.push({ ...doc.data(), id: doc.id });
  //       });
  //       setMassages(messages);
  //     });

  //     return () => unsubscribe;
  //   }, []);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((message, idx) => (
        <Message key={idx} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default ChatBox
