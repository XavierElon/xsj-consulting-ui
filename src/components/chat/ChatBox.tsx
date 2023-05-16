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

  useEffect(() => {
    if (authState.provider === 'local' && authState.user.profilePicture) {
      const imageBuffer = authState.user.profilePicture.data.data
      const imageType = authState.user.profilePicture.contentType
      const base64String = Buffer.from(imageBuffer).toString('base64')

      const url = `data:${imageType};base64,${base64String}`
      setImageUrl(url)
    }
  }, [authState])

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
    <div className="pb-60 w-full pl-28">
      <div style={messagesContainer}>
        {messages.map((message, idx) => (
          <Message key={idx} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {/* <SendMessage /> */}
    </div>
  )
}

export default ChatBox

const messagesContainer: CSSProperties = {
  maxHeight: '100%',
  overflowY: 'auto'
}
