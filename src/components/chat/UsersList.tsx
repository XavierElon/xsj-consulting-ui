'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Tooltip from '@mui/material/Tooltip'
import { AiFillRobot } from 'react-icons/ai'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import AddIcon from '@mui/icons-material/Add'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createChatGPTConversation } from '@/firebase/chat.firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import './UsersList.css'

const actions = [{ icon: <AddIcon />, name: 'Open ChatGPT Chat' }]

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [searchField, setSearchField] = useState<string>('')
  const { setSecondUserID, secondUser, setSecondUser, setCurrentUserID, conversations, setCurrentConversation, setCurrentConversationID } =
    useContext(ChatStateContext)
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
    setCurrentUserID(id)
    getUsers()
    console.log(conversations)
  }, [])

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

  const handleUserClick = (user: any) => {
    setSecondUser(user)
    setSecondUserID(user.id)
    const filteredConversation = getConversationWithUser(conversations, user.id)
    if (filteredConversation) {
      setCurrentConversation(filteredConversation!)
      setCurrentConversationID(filteredConversation.id!)
    } else {
      setCurrentConversation({ id: '', users: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      setCurrentConversationID('')
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }

  const handleChatGPTClick = async () => {
    console.log('clicked')
    try {
      const conversationId = await createChatGPTConversation(id)
      console.log(conversationId)
    } catch (error) {
      console.error(error)
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
        <Tooltip title="Start conversation with ChatGPT" placement="left-start" arrow>
          <SmartToyIcon className="robot-icon" onClick={handleChatGPTClick} />
        </Tooltip>

        {filteredUsers.map((user: any) => (
          <Tooltip title="User">
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
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default UsersList
