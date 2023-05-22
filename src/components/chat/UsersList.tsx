'use client'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])
  const {
    secondUserID,
    setSecondUserID,
    secondUser,
    setSecondUser,
    currentUserID,
    setCurrentUserID,
    conversations,
    setCurrentConversation,
    setCurrentConversationID
  } = useContext(ChatStateContext)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  useEffect(() => {
    setCurrentUserID(id)
    console.log(id)
    getUsers()
  }, [])

  useEffect(() => {}, [])

  useEffect(() => {
    console.log(users)
  }, [[users]])

  //   useEffect(() => {
  //     console.log(secondUserID)
  //     console.log(secondUser)
  //   }, [secondUserID, secondUser])

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:1017/users', {
        withCredentials: true
      })
      console.log(id)
      let filteredUsers = res.data.users.filter((user: any) => user.id !== sessionStorage.getItem('id'))
      setUsers(filteredUsers)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUserClick = (user: any) => {
    console.log(user)
    setSecondUser(user)
    setSecondUserID(user.id)
    const filteredConversation = getConversationWithUser(conversations, user.id)
    if (filteredConversation) {
      setCurrentConversation(filteredConversation!)
      setCurrentConversationID(filteredConversation.id!)
    } else {
      setCurrentConversation({ users: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      setCurrentConversationID('')
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  return (
    <div className="pl-20 pt-16 pb-10 flex-none justify-end overflow-y-auto flex flex-col-reverse">
      {users.map((user, idx) => (
        <div key={idx} className="flex items-center mt-4 cursor-pointer" onClick={() => handleUserClick(user)}>
          {/* Render user information here */}
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
  )
}

export default UsersList
