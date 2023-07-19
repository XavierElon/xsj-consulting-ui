import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthStateContext, ChatStateContext } from '@/context'
import { MessageInterface } from '@/models/chat.interfaces'

const useProfilePic = (message: MessageInterface) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const { authState } = useContext(AuthStateContext)
  const { secondUser, secondUserID } = useContext(ChatStateContext)

  useEffect(() => {
    const getProfilePic = async () => {
      setImageUrl('')

      if (message?.senderID === secondUserID) {
        if (Object.keys(secondUser.profilePicture).length !== 0) {
          if (secondUser.profilePicture) {
            setImageUrl(secondUser.profilePicture)
          }
        }
      } else if (message.senderID === localStorage.getItem('id')) {
        if (authState.profilePicture) setImageUrl(authState.profilePicture)
      }
    }

    getProfilePic()
  }, [message, secondUser, secondUserID])

  return imageUrl
}

export default useProfilePic
