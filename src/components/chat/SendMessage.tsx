'use client'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { addMessageToConversation } from '@/firebase/chat.firebase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import useChatListener from '@/hooks/useChatListener'
import BoltIcon from '@mui/icons-material/Bolt'

const SendMessage = () => {
  const [value, setValue] = useState<string>('')
  const {
    authState: { id, username }
  } = useContext(AuthStateContext)
  const { secondUser, currentConversationID, isChatGPTConversation, setIsChatGPTMessageLoading, isChatGPTMessageLoading } = useContext(ChatStateContext)

  const messages = useChatListener(currentConversationID!)

  const isConversationSelected = Boolean(currentConversationID || secondUser?.id)

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    setValue('')
    if (currentConversationID !== null) {
      await addMessageToConversation(currentConversationID, id, value, username)
    }
    if (currentConversationID !== null && isChatGPTConversation === true) {
      console.log('chat gpt')
      setIsChatGPTMessageLoading(true)
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CHATGPT3_CONVERSATION_ROUTE!,
        {
          message: value,
          conversationID: currentConversationID,
          messages: messages
        },
        { withCredentials: true }
      )
      // console.log(response)
      console.log('send message: ' + isChatGPTMessageLoading)
      if (response.status === 200) {
        console.log('200')
        try {
          console.log('try')
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

const MessageForm = ({ value, setValue, onSubmit, isConversationSelected }: any) => (
  <form className="containerWrap flex justify-end flex-grow">
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="input h-16 mr-4 flex-grow text-black focus:outline-none bg-gray-100 rounded-r-none"
      style={{ whiteSpace: 'pre-wrap' }}
    />
    <button
      type="submit"
      onClick={onSubmit}
      className={`w-auto btn text-white rounded-r-lg text-sm ${isConversationSelected ? 'btn-primary' : 'bg-gray-500 cursor-not-allowed'}`}
      disabled={!isConversationSelected}
    >
      Send
    </button>
  </form>
)

export default SendMessage
