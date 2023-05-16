import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState<any>(null)
  const { authState, getLoggedInUser } = useContext(AuthStateContext)
  const { getFirebaseUserConversations } = useContext(ChatStateContext)

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true' || authState.isLoggedIn) {
      const id = sessionStorage.getItem('id') || authState.id
      getLoggedInUser(id)
      getFirebaseUserConversations(id)
    }
  }, [getLoggedInUser, getFirebaseUserConversations])

  useEffect(() => {
    if (authState.provider === null || authState.provider === '') {
      // If authState.provider is null or an empty string, don't update authorized
      return
    }

    if (authState.provider) {
      setAuthorized(true)
    } else {
      setAuthorized(false)
    }
  }, [authState])

  return authorized
}
