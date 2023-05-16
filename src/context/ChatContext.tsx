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

  const getFirebaseUserConversations = useCallback(async (userID: string) => {
    try {
      const userConversations = await getConversationsForUser(userID)
      //   console.log(conversations)
      setConversations(userConversations)
      //   const messages = await conversations[0].messages
      //   console.log(messages)
    } catch (error) {
      console.log(error)
    }
  }, [])

  //   useEffect(() => {
  //     console.log('use effect')
  //     console.log(conversations)
  //   }, [conversations, getFirebaseUserConversations])

  return (
    <ChatStateContext.Provider value={{ senderID, setSenderID, conversations, setConversations, getFirebaseUserConversations }}>
      {props.children}
    </ChatStateContext.Provider>
  )
}

export { ChatStateContext, ChatStateProvider }
