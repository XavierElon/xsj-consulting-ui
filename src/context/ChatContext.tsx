'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ConversationInterface } from '@/models/chat.interfaces'
import { useAuthorization } from '@/hooks/useAuthorization'
import { AuthStateContext } from './AuthContext'
import { getConversationsForUser, getMessagesForConversation } from '@/firebase/chat.firebase'
import { FieldValue, collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

type ContextInterface = {
  currentUserID: string
  setCurrentUserID: (value: string) => void
  secondUserID: string
  setSecondUserID: (value: string) => void
  secondUser: any
  setSecondUser: (value: any) => void
  senderID: string
  setSenderID: (value: string) => void
  conversations: ConversationInterface[]
  setConversations: (value: ConversationInterface[]) => void
  currentConversationID: string
  setCurrentConversationID: (value: string) => void
  currentConversation: ConversationInterface
  setCurrentConversation: (value: ConversationInterface) => void
  getFirebaseUserConversations: (value: string) => any
}

const ChatStateContext = createContext<ContextInterface>({
  currentUserID: '',
  setCurrentUserID: () => {},
  secondUserID: '',
  setSecondUserID: () => {},
  secondUser: null,
  setSecondUser: () => {},
  senderID: '',
  setSenderID: () => {},
  conversations: [],
  setConversations: () => {},
  currentConversationID: '',
  setCurrentConversationID: () => {},
  currentConversation: { id: '', users: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() },
  setCurrentConversation: () => {},
  getFirebaseUserConversations: () => {}
})

const ChatStateProvider = (props: any) => {
  const [currentUserID, setCurrentUserID] = useState<string>('')
  const [secondUserID, setSecondUserID] = useState<string>('')
  const [secondUser, setSecondUser] = useState<any>()
  const [senderID, setSenderID] = useState<string>('')
  const [conversations, setConversations] = useState<ConversationInterface[]>([])
  const [currentConversationID, setCurrentConversationID] = useState<string>('')
  const [currentConversation, setCurrentConversation] = useState<any>()

  const getFirebaseUserConversations = useCallback(async (userID: string) => {
    try {
      const userConversations = await getConversationsForUser(userID)
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
    <ChatStateContext.Provider
      value={{
        currentUserID,
        setCurrentUserID,
        secondUserID,
        setSecondUserID,
        secondUser,
        setSecondUser,
        senderID,
        setSenderID,
        conversations,
        setConversations,
        currentConversationID,
        setCurrentConversationID,
        currentConversation,
        setCurrentConversation,
        getFirebaseUserConversations
      }}
    >
      {props.children}
    </ChatStateContext.Provider>
  )
}

export { ChatStateContext, ChatStateProvider }
