'use client'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { AiFillRobot } from 'react-icons/ai'
import AddIcon from '@mui/icons-material/Add'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
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
  }, [])

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:1017/users', {
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

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col-reverse">
        <div className="p-2">
          <input
            className="border rounded-lg py-2 px-4 focus:outline-none bg-gray-400 text-white placeholder-white focus:ring-1 focus:ring-blue-500"
            type="search"
            placeholder="Search Users"
            onChange={handleChange}
          />
        </div>
        <AiFillRobot className="robot-icon" title="Start a new chat with ChatGPT" />
        {/* <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'absolute', bottom: 16, right: 16, color: 'black' }}
          icon={<AiFillRobot style={buttonStyle} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
          ))}
        </SpeedDial> */}
        {filteredUsers.map((user: any) => (
          <div key={user.id} className="flex items-center mt-4 cursor-pointer" onClick={() => handleUserClick(user)}>
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
