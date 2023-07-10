'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createConversation, getUsersConversations } from '@/firebase/chat.firebase'
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
    setConversations,
    setCurrentConversation,
    setCurrentConversationID,
    setIsChatGPTConversation
  } = useContext(ChatStateContext)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  let filteredUsers = users.filter((user: any) => {
    return user.username.toLowerCase().includes(searchField.toLowerCase())
  })

  const createNewConversation = async () => {
    const newConversationId = await createConversation(id, secondUserID)
    const convos = await getUsersConversations(id)
    setConversations(convos)
    setCurrentConversationID(newConversationId)
    const conversation = getConversationWithUser(conversations, secondUserID)
    setCurrentConversation(conversation!)
  }

  // const timeout = (milliseconds: number) => {
  //   return new Promise((resolve, reject) => setTimeout(() => resolve('Timeout done')))
  // }

  const getUsers = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_USERS_GET_ALL_USERS_ROUTE!, {
        withCredentials: true
      })
      let filteredUsers = res.data.users.filter((user: any) => user.id !== localStorage.getItem('id'))
      setUsers(filteredUsers)
    } catch (error) {
      console.error(error)
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }
  const handleUserClick = (user: any) => {
    setSecondUser(user)
    setSecondUserID(user.id)
    setIsChatGPTConversation(false)
  }

  useEffect(() => {
    getUsers()
  }, [conversations])

  useEffect(() => {
    const filteredConversation = getConversationWithUser(conversations, secondUserID)
    if (filteredConversation !== undefined) {
      setCurrentConversation(filteredConversation)
      setCurrentConversationID(filteredConversation.id!)
    } else if (secondUserID) {
      const existingEmptyConversation = conversations.find((conversation) => conversation.users.includes(secondUserID))
      if (!existingEmptyConversation) {
        createNewConversation()
      } else {
        setCurrentConversation(existingEmptyConversation)
        setCurrentConversationID(existingEmptyConversation.id!)
      }
    } else {
      return
    }
  }, [secondUser, secondUserID])

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

        {filteredUsers.map((user: any) => {
          const isSelected: boolean = user.id === secondUserID
          return (
            <div
              key={user.id}
              className={`flex items-center mt-2 ml-4 cursor-pointer ${isSelected ? 'bg-gray-300 py-2 px-2 rounded-lg' : ' bg-inherit'}`}
              onClick={() => handleUserClick(user)}
            >
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
          )
        })}
      </div>
    </div>
  )
}

export default UsersList
