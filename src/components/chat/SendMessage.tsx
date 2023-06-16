'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { addMessageToConversation, createConversation } from '@/firebase/chat.firebase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'

const SendMessage = () => {
  const [value, setValue] = useState('')
  const [conversationSelected, setConversationSelected] = useState<boolean>(false)
  const { authState } = useContext(AuthStateContext)
  let { id } = authState
  const { secondUser, secondUserID, currentConversationID } = useContext(ChatStateContext)

  useEffect(() => {
    console.log(secondUser)
  }, [secondUser])

  useEffect(() => {
    if (currentConversationID || secondUserID) {
      setConversationSelected(true)
    }
  }, [currentConversationID, secondUserID])

  const returnSecondUserDisplay = () => {
    if (secondUser && secondUser.username) {
      console.log(secondUser)
      return (
        <div className="flex items-center">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <Image src={secondUser.profilePicture.url} width="25" height="25" alt="profilePic" className="rounded-full" />
            </div>
          </div>
          <p className="text-black font-bold">{secondUser.username}</p>
        </div>
      )
    } else if (secondUser && !secondUser.username) {
      return (
        <div className="text-black">
          {secondUser.username}
          <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }}></AccountCircleIcon>
        </div>
      )
    } else {
      return null
    }
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (currentConversationID !== null) {
      await addMessageToConversation(currentConversationID, id, value)
    }
    setValue('')
  }

  return (
    <div className="bg-gray-200 w-full py-6 shadow-lg px-2 ">
      {returnSecondUserDisplay()}
      <form className="containerWrap flex justify-end">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input w-5/6 text-black focus:outline-none bg-gray-100 rounded-r-none"
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
  )
}

export default SendMessage
