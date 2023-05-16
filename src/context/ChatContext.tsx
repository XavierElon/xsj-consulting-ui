'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Conversation } from '@/models/chat.interfaces'
import { useAuthorization } from '@/hooks/useAuthorization'
import { AuthStateContext } from './AuthContext'
import { getConversationsForUser, getMessagesForConversation } from '@/firebase/chat.firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

type ContextInterface = {
  senderID: string
  setSenderID: (value: string) => void
  conversations: Conversation[]
  setConversations: (value: Conversation[]) => void
  getFirebaseUserConversations: (value: string) => any
}
const ChatStateContext = createContext<ContextInterface>({
  senderID: '',
  setSenderID: () => {},
  conversations: [],
  setConversations: () => {},
  getFirebaseUserConversations: () => {}
})

const ChatStateProvider = (props: any) => {
  const authorized = useAuthorization()
  //   const { authState } = useContext(AuthStateContext)

  const [senderID, setSenderID] = useState<string>('')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const getFirebaseUserConversations = useCallback((userID: string) => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'conversations'), where('users', 'array-contains', userID)),
      async (snapshot) => {
        const updatedConversations = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data() as any
            const messages = await getMessagesForConversation(doc.id)
            return { ...data, messages } as Conversation
          })
        )

        // This will run every time a new conversation is added to the Firestore
        setConversations(updatedConversations)
      },
      (error) => {
        console.error('Error fetching conversations: ', error)
      }
    )
  }, [])

  useEffect(() => {
    console.log(conversations)
  }, [conversations, getFirebaseUserConversations])

  return (
    <ChatStateContext.Provider value={{ senderID, setSenderID, conversations, setConversations, getFirebaseUserConversations }}>
      {props.children}
    </ChatStateContext.Provider>
  )
}

export { ChatStateContext, ChatStateProvider }
