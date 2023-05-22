'use client'
import { useContext, useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { createOrUpdateConversation } from '@/firebase/chat.firebase'
import { useAuthorization } from '@/hooks/useAuthorization'

const SendMessage = () => {
  const [value, setValue] = useState('')
  const { authState } = useContext(AuthStateContext)
  let id: string
  const authorized = useAuthorization()
  const { getFirebaseUserConversations } = useContext(ChatStateContext)

  useEffect(() => {
    if (authorized) {
      id = authState.id
      console.log(id)
    }
  }, [])
  const handleSendMessage = async (e: any) => {
    e.preventDefault()

    await createOrUpdateConversation('64653f3c16ddd13c44e1dbb3', '6465403492504b04b44a1462', value)
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
