'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { addMessageToConversation, createConversation } from '@/firebase/chat.firebase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import { LinearToSRGB } from 'three/src/math/ColorManagement'

const SendMessage = () => {
  const [value, setValue] = useState('')
  const [secondUserProfilePictureUrl, setSecondUserProfilePictureUrl] = useState<string>('')
  const [conversationSelected, setConversationSelected] = useState<boolean>(false)
  const { authState } = useContext(AuthStateContext)
  let { id } = authState
  const { secondUser, secondUserID, currentConversationID } = useContext(ChatStateContext)

  // useEffect(() => {
  //   console.log(secondUser)
  //   if (secondUser.provider === 'firebaseGoogle') {
  //     profilePictureUrl = secondUser.profilePitcure
  //   } else if (secondUser.provider === 'local') {
  //     profilePictureUrl = secondUser.profilePicture.url
  //   }
  // }, [secondUser])

  useEffect(() => {
    if (secondUser) {
      console.log(secondUser)
      console.log(secondUser.provider)

      if (secondUser.provider === 'firebaseGoogle') {
        console.log('google')
        setSecondUserProfilePictureUrl(secondUser.profilePicture)
      } else if (secondUser.provider === 'local') {
        console.log('local')
        setSecondUserProfilePictureUrl(secondUser.profilePicture.url)
      }
    }
    console.log(secondUserProfilePictureUrl)
  }, [secondUser])

  useEffect(() => {
    if (currentConversationID || secondUserID) {
      setConversationSelected(true)
    }
  }, [currentConversationID, secondUserID])

  const returnSecondUserDisplay = () => {
    if (secondUser && Object.keys(secondUser.profilePicture).length !== 0) {
      console.log(secondUser)
      console.log(secondUserProfilePictureUrl)
      return (
        <div className="flex items-center w-1/6">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <Image src={secondUserProfilePictureUrl} width="25" height="25" alt="profilePic" className="rounded-full" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-black font-bold mb-1">{secondUser.username}</p>
          </div>
        </div>
      )
    } else if (secondUser && Object.keys(secondUser.profilePicture).length === 0) {
      console.log('here')
      return (
        <div className="flex items-center w-1/6">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
              <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '50px' }}></AccountCircleIcon>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-black font-bold mb-1">{secondUser.username}</p>
          </div>
        </div>
      )
    } else {
      console.log('null')
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
    <div className="bg-gray-200 w-full py-6 shadow-lg px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">{returnSecondUserDisplay()}</div>
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
