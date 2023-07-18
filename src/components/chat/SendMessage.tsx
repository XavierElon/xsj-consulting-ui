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
  const [value, setValue] = useState('')
  // const [secondUserProfilePictureUrl, setSecondUserProfilePictureUrl] = useState<string>('')
  const [conversationSelected, setConversationSelected] = useState<boolean>(false)
  const { authState } = useContext(AuthStateContext)
  let { id, username, photoURL } = authState
  const { secondUser, secondUserID, currentConversationID, isChatGPTConversation } = useContext(ChatStateContext)
  const messages = useChatListener(currentConversationID!)

  // console.log(photoURL)
  // useEffect(() => {
  //   if (secondUser) {
  //     if (secondUser.provider === 'firebaseGoogle') {
  //       setSecondUserProfilePictureUrl(secondUser.profilePicture)
  //     } else if (secondUser.provider === 'local') {
  //       setSecondUserProfilePictureUrl(secondUser.profilePicture.url)
  //     }
  //   }
  // }, [secondUser])

  useEffect(() => {
    setValue('')
    if (currentConversationID || secondUserID) {
      setConversationSelected(true)
    }
  }, [currentConversationID, secondUserID])

  const returnSecondUserDisplay = () => {
    if (secondUser?.profilePicture) {
      return (
        <div className="flex items-center w-1/6">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <Image src={secondUser?.profilePicture} width="25" height="25" alt="profilePic" className="rounded-full" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-black font-bold mb-1">{secondUser?.username}</p>
          </div>
        </div>
      )
    } else if (secondUser && !secondUser?.profilePicture) {
      return (
        <div className="flex items-center w-1/6">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }}></AccountCircleIcon>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-black font-bold mb-1">{secondUser?.username}</p>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    setValue('')
    if (currentConversationID !== null) {
      await addMessageToConversation(currentConversationID, id, value, username)
    }
    if (currentConversationID !== null && isChatGPTConversation === true) {
      console.log('chat gpt')
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CHATGPT3_CONVERSATION_ROUTE!,
        {
          message: value,
          conversationID: currentConversationID,
          messages: messages
        },
        { withCredentials: true }
      )
      if (response.status === 200) {
        try {
          await addMessageToConversation(currentConversationID, 'chatGPT-3.5', response.data.message, 'chatGPT-3.5')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <div className="bg-gray-200 w-full py-6 shadow-lg px-2">
      <div className="flex items-center justify-between">
        {isChatGPTConversation ? (
          <div className="flex">
            <BoltIcon style={{ color: 'purple', fontSize: '40px' }}></BoltIcon>
            <p className="mr-2 my-2">ChatGPT 3.5</p>
          </div>
        ) : (
          <div className="flex items-center">{returnSecondUserDisplay()}</div>
        )}

        <form className="containerWrap flex justify-end flex-grow">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input flex-grow text-black focus:outline-none bg-gray-100 rounded-r-none"
            type="text"
          />
          <button
            type="submit"
            onClick={handleSendMessage}
            className={`w-auto btn text-white rounded-r-lg text-sm ${conversationSelected ? 'btn-primary' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={!conversationSelected}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default SendMessage
