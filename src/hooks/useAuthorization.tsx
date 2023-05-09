import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState<any>(null)
  const { authState, getLoggedInUser } = useContext(AuthStateContext)

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      const id = sessionStorage.getItem('id')
      getLoggedInUser(id)
    }
  }, [getLoggedInUser])

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
