'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ConversationInterface } from '@/models/chat.interfaces'
import { useAuthorization } from '@/hooks/useAuthorization'
import { AuthStateContext } from './AuthContext'
import { getConversationsForUser, getMessagesForConversation } from '@/firebase/chat.firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

type ContextInterface = {
  senderID: string
  setSenderID: (value: string) => void
  conversations: ConversationInterface[]
  setConversations: (value: ConversationInterface[]) => void
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
  const [senderID, setSenderID] = useState<string>('')
  const [conversations, setConversations] = useState<ConversationInterface[]>([])

  const getFirebaseUserConversations = useCallback(async (userID: string) => {
    try {
      const userConversations = await getConversationsForUser(userID)
      console.log('here')
      setConversations(userConversations)
      //   const messages = await conversations[0].messages
      //   console.log(messages)
      return userConversations
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
