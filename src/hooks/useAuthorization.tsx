import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState<any>(null)
  const { authState, getLoggedInUser } = useContext(AuthStateContext)
  const { getFirebaseUserConversations } = useContext(ChatStateContext)

  useEffect(() => {
    const getUserInfo = async () => {
      if (localStorage.getItem('isLoggedIn') === 'true' || authState.isLoggedIn || sessionStorage.getItem('isAuthenticated') === 'true') {
        const id = localStorage.getItem('id') || authState.id
        await getLoggedInUser(id)
        await getFirebaseUserConversations(id)
      }
    }
    getUserInfo()
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

  if (authorized === null) return false
  else return authorized
}
