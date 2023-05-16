'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Conversation } from '@/models/chat.interfaces'
import { useAuthorization } from '@/hooks/useAuthorization'
import { AuthStateContext } from './AuthContext'

type ContextInterface = {
  senderID: string
  setSenderID: (value: string) => void
  conversations: Conversation[]
  setConversations: (value: Conversation[]) => void
  getFirebaseUserConversations: (value: string) => Promise<Conversation[]>
}
const ChatStateContext = createContext<ContextInterface>({
  senderID: '',
  setSenderID: () => {},
  conversations: [],
  setConversations: () => {},
  getFirebaseUserConversations: async (value: string) => {
    return []
  }
})

const ChatStateProvider = (props: any) => {
  const authorized = useAuthorization()
  const { authState } = useContext(AuthStateContext)

  const [senderID, setSenderID] = useState<string>('')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const getFirebaseUserConversations = async (userID: string): Promise<Conversation[]> => {
    return Promise.resolve([])
  }

  return (
    <ChatStateContext.Provider value={{ senderID, setSenderID, conversations, setConversations, getFirebaseUserConversations }}>
      {props.children}
    </ChatStateContext.Provider>
  )
}

export { ChatStateContext, ChatStateProvider }
