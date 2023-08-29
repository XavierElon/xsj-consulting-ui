'use client'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createConversation, getUsersConversations } from '@/firebase/chat.firebase'
import 'firebase/compat/firestore'
import './UsersList.css'
import SearchInput from './SearchInput'
import UserItem from './UserItem'
import { fetchUsers } from '@/api/users.api'

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])
  const [searchField, setSearchField] = useState<string>('')
  const { secondUserID, setSecondUserID, secondUser, setSecondUser, conversations, setConversations, setCurrentConversation, setCurrentConversationID, setIsChatGPTConversation } =
    useContext(ChatStateContext)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState

  let filteredUsers = users.filter((user: any) => {
    return user.username.toLowerCase().includes(searchField.toLowerCase())
  })

  const createNewConversation = async () => {
    try {
      const newConversationId = await createConversation(id, secondUserID)

      // Fetch all conversations after creating a new one.
      const allConversations = await getUsersConversations(id)
      setConversations(allConversations)

      // Search the newly fetched conversations for the one we just created.
      const newConversation: ConversationInterface | undefined = getConversationWithUser(allConversations, secondUserID)

      if (newConversation) {
        setCurrentConversation(newConversation)
        setCurrentConversationID(newConversationId)
      } else {
        console.error('New conversation not found in the list of conversations')
      }
    } catch (error) {
      console.error('Error creating a new conversation:', error)
    }
  }

  const getConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
    return conversations.find((conversation) => conversation.users.includes(userID))
  }

  const handleUserClick = (user: any) => {
    setSecondUser(user)
    setSecondUserID(user.id)
    setIsChatGPTConversation(false)
  }

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers()
      setUsers(fetchedUsers)
    }

    loadUsers()
  }, [])

  // useEffect(() => {
  //   getUsers()
  // }, [conversations])

  useEffect(() => {
    // If there's no user ID, exit early.
    if (!secondUserID) return

    const findConversationWithUser = (conversations: ConversationInterface[], userID: string): ConversationInterface | undefined => {
      return conversations.find((conversation) => conversation.users.includes(userID))
    }

    const foundConversation = findConversationWithUser(conversations, secondUserID)

    // If a conversation is found, set it as current.
    if (foundConversation) {
      setCurrentConversation(foundConversation)
      setCurrentConversationID(foundConversation.id!) // Note: Using ! assumes that id will always be available. Be careful with this.
      return
    }

    // If no conversation was found, but there's a second user, attempt to create a new conversation.
    createNewConversation()
  }, [secondUser, secondUserID])

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col-reverse flex-grow overflow-y-auto">
        <SearchInput onChange={setSearchField} />
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} isSelected={user.id === secondUserID} onClick={handleUserClick} />
        ))}
      </div>
    </div>
  )
}

export default UsersList
