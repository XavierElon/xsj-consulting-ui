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

const UsersList = () => {
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

  let filteredUsers = users.filter((user: any) => {
    return user.username.toLowerCase().includes(searchField.toLowerCase())
  })

  useEffect(() => {
    filteredUsers = users.filter((user: any) => {
      return user.username.toLowerCase().includes(searchField.toLowerCase())
    })
  }, [])

  useEffect(() => {
    getUsers()
    console.log(conversations)
  }, [conversations])

  useEffect(() => {
    const convo = getConversationWithChatGPT(conversations)
    setChatGPTConversation(convo)
  }, [conversations])

  useEffect(() => {
    console.log(secondUser)
    console.log(secondUserID)
    const filteredConversation = getConversationWithUser(conversations, secondUserID)
    console.log(filteredConversation)
    if (filteredConversation) {
      setCurrentConversation(filteredConversation!)
      setCurrentConversationID(filteredConversation.id!)
    } else {
      console.log('else')
      setCurrentConversation({ id: '', users: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      setCurrentConversationID('')
    }
  }, [secondUser, secondUserID])

  // const timeout = (milliseconds: number) => {
  //   return new Promise((resolve, reject) => setTimeout(() => resolve('Timeout done')))
  // }

  const getUsers = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_USERS_GET_ALL_USERS_ROUTE!, {
        withCredentials: true
      })
      let filteredUsers = res.data.users.filter((user: any) => user.id !== sessionStorage.getItem('id'))
      setUsers(filteredUsers)
    } catch (error) {
      console.error(error)
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    console.log(conversations)
    console.log(userID)
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  const getConversationWithChatGPT = (conversations: ConversationInterface[]): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes('chatGPT-3.5'))
  }

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }
  const handleUserClick = (user: any) => {
    setSecondUser(user)
    setSecondUserID(user.id)
  }

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
      <div className="flex flex-col-reverse">
        <div className="p-2 my-4 ml-2">
          <input
            className="border rounded-lg py-2 px-4 focus:outline-none bg-gray-400 text-white placeholder-white focus:ring-1 focus:ring-blue-500"
            type="search"
            placeholder="Search Users"
            onChange={handleChange}
          />
        </div>
        {/* <Tooltip title="Start conversation with ChatGPT" placement="left-start" arrow>
          <SmartToyIcon className="robot-icon" onClick={handleChatGPTClick} />
        </Tooltip> */}

        {filteredUsers.map((user: any) => (
          <div key={user.id} className="flex items-center mt-4 ml-4 cursor-pointer" onClick={() => handleUserClick(user)}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full mr-2">
                {user.provider === 'firebaseGoogle' ? (
                  <Image alt="profilePicture" width="15" height="15" src={user.profilePicture}></Image>
                ) : user.provider === 'local' && user.profilePicture.url ? (
                  <Image alt="profilePicture" width="15" height="15" src={user.profilePicture.url}></Image>
                ) : (
                  <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
                )}
              </div>
            </div>
            <p className="text-black font-bold">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList
