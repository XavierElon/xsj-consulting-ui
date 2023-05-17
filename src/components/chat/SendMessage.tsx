'use client'
import { useContext, useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { db } from '@/firebase/firebase'
import { createOrUpdateConversation } from '@/firebase/chat.firebase'

const SendMessage = () => {
  const [value, setValue] = useState('')
  const { authState } = useContext(AuthStateContext)
  const { id } = authState
  const { getFirebaseUserConversations } = useContext(ChatStateContext)

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    await createOrUpdateConversation('6463887e6e2eb904fb9db56a', '64625b547fd59b990d3d29e2', value)
    await getFirebaseUserConversations(id)
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
