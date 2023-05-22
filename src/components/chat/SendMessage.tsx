'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { addMessageToConversation, createConversation } from '@/firebase/chat.firebase'
import { useAuthorization } from '@/hooks/useAuthorization'

const SendMessage = () => {
  const [value, setValue] = useState('')
  const { authState } = useContext(AuthStateContext)
  let id: string
  const authorized = useAuthorization()
  const { currentUserID, secondUserID, currentConversationID } = useContext(ChatStateContext)

  useEffect(() => {
    if (authorized) {
      // id = sessionStorage.getItem('id')!
      // console.log(id)
    }
  }, [])

  const handleSendMessage = async (e: any) => {
    id = sessionStorage.getItem('id')!
    e.preventDefault()
    console.log(currentConversationID)
    if (!currentConversationID) {
      console.log(id)
      console.log(secondUserID)
      await createConversation(id, secondUserID, value)
    } else if (currentConversationID) {
      console.log('elkse')
      await addMessageToConversation(currentConversationID, id, value)
    } else {
      console.log('else')
    }

    setValue('')
  }

  return (
    <div className="bg-gray-200 w-full py-6 shadow-lg">
      <form className="px-2 containerWrap flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
        />
        <button type="submit" onClick={handleSendMessage} className="w-auto btn btn-primary text-white rounded-r-lg text-sm">
          Send
        </button>
      </form>
    </div>
  )
}

export default SendMessage
