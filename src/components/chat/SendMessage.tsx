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

  //   const handleSendMessage = async (e) => {
  //     e.preventDefault();

  //     if(value.trim() === "") {
  //       alert("Enter valid message!");
  //       return;
  //     }

  //     try {
  //       const { uid, displayName, photoURL } = currentUser;
  //       await addDoc(collection(db, "messages"), {
  //         text: value,
  //         name: displayName,
  //         avatar: photoURL,
  //         createdAt: serverTimestamp(),
  //         uid
  //       })
  //     } catch(error) {
  //       console.log(error);
  //     }
  //     setValue("");
  //   }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    await createOrUpdateConversation('6463887e6e2eb904fb9db56a', '64625b547fd59b990d3d29e2', value)
    await getFirebaseUserConversations(id)
  }

  return (
    <div className="bg-gray-200 fixed bottom-16 w-full py-10 shadow-lg">
      <form className="px-2 containerWrap flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
        />
        <button type="submit" onClick={handleSendMessage} className="w-auto btn btn-primary text-white rounded-r-lg px-5 text-sm">
          Send
        </button>
      </form>
    </div>
  )
}

export default SendMessage
