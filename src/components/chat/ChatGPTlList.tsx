'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Tooltip from '@mui/material/Tooltip'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createChatGPTConversation } from '@/firebase/chat.firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import './UsersList.css'

const ChatGPTList = () => {
  const [users, setUsers] = useState<any[]>([])
  const [searchField, setSearchField] = useState<string>('')
  const {
    secondUserID,
    setSecondUserID,
    secondUser,
    setSecondUser,
    conversations,
    setCurrentConversation,
    setCurrentConversationID,
    chatGPTConversation,
    setChatGPTConversation
  } = useContext(ChatStateContext)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  let chats = [{ name: 'achilles' }, { name: 'musk' }, { anme: 'flocka' }]

  const handleChatGPTClick = async () => {
    if (!chatGPTConversation) {
      try {
        const conversationID = await createChatGPTConversation(id)
        console.log(conversationID)
        setCurrentConversation(null)
        setCurrentConversationID(conversationID)
      } catch (error) {
        console.error(error)
      }
    } else {
      setCurrentConversation(chatGPTConversation)
      setCurrentConversationID(chatGPTConversation.id!)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="border-4 border-black">
        <div className="mt-10">
          <Tooltip title="Start conversation with ChatGPT" placement="left-start" arrow>
            <SmartToyIcon className="robot-icon" onClick={handleChatGPTClick} />
          </Tooltip>
        </div>

        <div className="flex ml-14 fixed bottom-5 border-white border-4 px-20 py-3">
          <p className="text-black text-xl">New chat</p>
        </div>
      </div>
      <div className="flex flex-col-reverse">
        <div className="mb-16 ml-8">
          {chats.map((chat: any, idx: any) => (
            <div key={idx} className="flex items-center mt-4 ml-4 cursor-pointer">
              {/* <div className="chat-image avatar">
              <div className="w-10 rounded-full mr-2">
                <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon> */}
              <h1 className="text-black">{chat.name}</h1>
              {/* </div>
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatGPTList
