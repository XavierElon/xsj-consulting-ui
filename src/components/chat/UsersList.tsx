'use client'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'

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
    setSecondUser(user)
    setSecondUserID(user.id)
    const filteredConversation = getConversationWithUser(conversations, user.id)
    console.log(filteredConversation)
    if (filteredConversation) {
      setCurrentConversation(filteredConversation!)
      setCurrentConversationID(filteredConversation.id!)
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  return (
    <div className="pl-20 pt-16 pb-10 flex-none overflow-y-auto flex flex-col-reverse">
      {users.map((user, idx) => (
        <div key={idx} className="flex items-center mt-4 cursor-pointer" onClick={() => handleUserClick(user)}>
          {/* Render user information here */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full mr-2">
              {user.provider === 'firebaseGoogle' ? (
                <Image alt="profilePicture" width="15" height="15" src={user.profilePicture}></Image>
              ) : (
                <Image alt="profilePicture" width="15" height="15" src={user.profilePicture.url}></Image>
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
