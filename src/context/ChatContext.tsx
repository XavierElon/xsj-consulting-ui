'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ConversationInterface } from '@/models/chat.interfaces'
import { AuthStateContext } from './AuthContext'
import { getUsersConversations } from '@/firebase/chat.firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { Timestamp } from 'firebase/firestore'

type ContextInterface = {
  secondUserID: string
  setSecondUserID: (value: string) => void
  secondUser: any
  setSecondUser: (value: any) => void
  conversations: ConversationInterface[]
  setConversations: (value: ConversationInterface[]) => void
  currentConversationID: string | null
  setCurrentConversationID: (value: string | null) => void
  currentConversation: ConversationInterface | null
  setCurrentConversation: (value: ConversationInterface | null) => void
  isChatGPTConversation: boolean
  setIsChatGPTConversation: (value: boolean) => void
  isChatGPTConversation3: boolean
  setIsChatGPTConversation3: (value: boolean) => void
  isChatGPTConversation4: boolean
  setIsChatGPTConversation4: (value: boolean) => void
  getFirebaseUserConversations: (value: string) => any
  updateConversations: () => void
}

const ChatStateContext = createContext<ContextInterface>({
  secondUserID: '',
  setSecondUserID: () => {},
  secondUser: null,
  setSecondUser: () => {},
  conversations: [],
  setConversations: () => {},
  currentConversationID: null,
  setCurrentConversationID: () => {},
  currentConversation: { users: [], createdAt: Timestamp.now() },
  setCurrentConversation: () => {},
  isChatGPTConversation: false,
  setIsChatGPTConversation: () => {},
  isChatGPTConversation3: false,
  setIsChatGPTConversation3: () => {},
  isChatGPTConversation4: false,
  setIsChatGPTConversation4: () => {},
  getFirebaseUserConversations: () => {},
  updateConversations: () => {}
})

const ChatStateProvider = (props: any) => {
  const [secondUserID, setSecondUserID] = useState<string>('')
  const [secondUser, setSecondUser] = useState<any>()
  const [conversations, setConversations] = useState<ConversationInterface[]>([])
  const [currentConversationID, setCurrentConversationID] = useState<string | null>(null)
  const [currentConversation, setCurrentConversation] = useState<any>(null)
  const [isChatGPTConversation, setIsChatGPTConversation] = useState<boolean>(false)
  const [isChatGPTConversation3, setIsChatGPTConversation3] = useState<boolean>(false)
  const [isChatGPTConversation4, setIsChatGPTConversation4] = useState<boolean>(false)
  const {
    authState: { id }
  } = useContext(AuthStateContext)

  const getFirebaseUserConversations = useCallback(async (userID: string) => {
    try {
      const userConversations = await getUsersConversations(userID)
      setConversations(userConversations)
      return userConversations
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updateConversations = async () => {
    const updatedConversations = await getUsersConversations(id)
    setConversations(updatedConversations)
  }

  useEffect(() => {
    getFirebaseUserConversations(id)
  }, [])

  return (
    <ChatStateContext.Provider
      value={{
        secondUserID,
        setSecondUserID,
        secondUser,
        setSecondUser,
        conversations,
        setConversations,
        currentConversationID,
        setCurrentConversationID,
        currentConversation,
        setCurrentConversation,
        isChatGPTConversation,
        setIsChatGPTConversation,
        isChatGPTConversation3,
        setIsChatGPTConversation3,
        isChatGPTConversation4,
        setIsChatGPTConversation4,
        getFirebaseUserConversations,
        updateConversations
      }}
    >
      {props.children}
    </ChatStateContext.Provider>
  )
}

export { ChatStateContext, ChatStateProvider }
