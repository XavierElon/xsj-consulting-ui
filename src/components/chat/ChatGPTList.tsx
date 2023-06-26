'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createChatGPTConversation, deleteConversation, getUsersConversations } from '@/firebase/chat.firebase'
import 'firebase/compat/firestore'
import './UsersList.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const ChatGPTList = () => {
  const [chatGPTConversations, setChatGPTConversations] = useState<any[]>([])
  const {
    conversations,
    setCurrentConversation,
    setCurrentConversationID,
    chatGPTConversation,
    setChatGPTConversation,
    setConversations,
    setIsChatGPTConversation
  } = useContext(ChatStateContext)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  const getConversationsWithChatGPT = (conversations: ConversationInterface[]): ConversationInterface[] => {
    const chatGPTConversations = conversations.filter((conversation) => conversation.users.includes('chatGPT-3.5'))
    return chatGPTConversations ? chatGPTConversations : []
  }

  const handleSetConversation = (chatID: string) => {
    console.log(chatID)
    setCurrentConversationID(chatID)
    setIsChatGPTConversation(true)
  }

  const handleNewChatGPTClick = async () => {
    console.log(chatGPTConversation)
    if (!chatGPTConversation) {
      try {
        const conversationID = await createChatGPTConversation(id)
        const convos = await getUsersConversations(id)
        setConversations(convos)
        console.log(conversationID)
        setCurrentConversation(null)
        setCurrentConversationID(conversationID)
        setIsChatGPTConversation(true)
      } catch (error) {
        console.error(error)
      }
    } else {
      setCurrentConversation(chatGPTConversation)
      setCurrentConversationID(chatGPTConversation.id!)
      setIsChatGPTConversation(true)
    }
  }

  const handleDeleteChatGPTConversation = async (ConversationID: string) => {
    console.log(ConversationID)
    try {
      await deleteConversation(ConversationID)
      const convos = await getUsersConversations(id)
      setConversations(convos)
      setCurrentConversation(null)
      setCurrentConversationID(null)
      setIsChatGPTConversation(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(conversations)
    const convos = getConversationsWithChatGPT(conversations)
    console.log(convos)
    setChatGPTConversations(convos)
  }, [conversations])

  useEffect(() => {
    console.log(chatGPTConversations)
  }, [chatGPTConversations])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-auto">
        <div className="my-20">
          {chatGPTConversations.map((chat: any) => (
            <div key={chat.id} className="flex items-start justify-between mt-4 ">
              <div className="flex items-center cursor-pointer" onClick={() => handleSetConversation(chat.id)}>
                <ChatBubbleOutlineIcon className="mx-4"></ChatBubbleOutlineIcon>
                {chat.messages.length === 0 ? (
                  <h1 className="text-black font-semibold">New Chat</h1>
                ) : (
                  <h1 className="text-black font-semibold">{chat.id}</h1>
                )}
              </div>
              <DeleteOutlineIcon
                style={{ color: 'black', fontSize: '30px' }}
                className="justify-end mx-4 font-black cursor-pointer"
                onClick={() => handleDeleteChatGPTConversation(chat.id)}
              ></DeleteOutlineIcon>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center border-white rounded-xl border-4 py-3 mx-4 cursor-pointer mb-5" onClick={handleNewChatGPTClick}>
        <p className="justify-center text-black text-xl font-bold">New Chat</p>
      </div>
    </div>
  )
}

export default ChatGPTList
