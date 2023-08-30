'use client'
import { SyntheticEvent, useContext, useState } from 'react'
import axios from 'axios'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { addMessageToConversation } from '@/firebase/chat.firebase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import useChatListener from '@/hooks/useChatListener'
import BoltIcon from '@mui/icons-material/Bolt'
import MessageForm from './MessageForm'
import { sendChatGpt3Message } from '@/api/users.api'

const SendMessage = () => {
  const [value, setValue] = useState<string>('')
  const {
    authState: { id, username }
  } = useContext(AuthStateContext)
  const { secondUser, currentConversationID, isChatGPTConversation, setIsChatGPTMessageLoading } = useContext(ChatStateContext)

  const messages = useChatListener(currentConversationID!)

  const isConversationSelected = Boolean(currentConversationID || secondUser?.id)

  const handleSendMessage = async (e: SyntheticEvent) => {
    e.preventDefault()
    setValue('')
    if (currentConversationID !== null) {
      await addMessageToConversation(currentConversationID, id, value, username)
    }

    if (currentConversationID !== null && isChatGPTConversation === true) {
      setIsChatGPTMessageLoading(true)
      const response = await sendChatGpt3Message(value, currentConversationID, messages)

      if (response.status === 200) {
        try {
          await addMessageToConversation(currentConversationID, 'chatGPT-3.5', response.data.message, 'chatGPT-3.5')
          setIsChatGPTMessageLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <div className="bg-gray-200 w-full py-6 shadow-lg px-2">
      <div className="flex items-center justify-between">
        {isChatGPTConversation ? <ChatGPTHeader /> : <UserHeader user={secondUser} />}
        <MessageForm value={value} setValue={setValue} onSubmit={handleSendMessage} isConversationSelected={isConversationSelected} />
      </div>
    </div>
  )
}

const ChatGPTHeader = () => (
  <div className="flex">
    <BoltIcon style={{ color: 'purple', fontSize: '40px' }}></BoltIcon>
    <p className="mr-2 my-2">ChatGPT 3.5</p>
  </div>
)

const UserHeader = ({ user }: { user: any }) => (
  <div className="flex items-center">
    <div className="chat-image avatar">
      <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
        {user?.profilePicture ? (
          <Image src={user.profilePicture} width="25" height="25" alt="profilePic" className="rounded-full" />
        ) : (
          <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }} />
        )}
      </div>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-black font-bold mb-1">{user?.username}</p>
    </div>
  </div>
)

export default SendMessage
