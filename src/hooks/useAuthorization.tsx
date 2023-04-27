import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState<any>(null)
  const { authState, getLoggedInUser } = useContext(AuthStateContext)

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const id = localStorage.getItem('id')
      getLoggedInUser(id)
    }
  }, [])

  useEffect(() => {
    if (authState.provider !== null && authState.provider !== '') {
      setAuthorized(true)
    } else {
      setAuthorized(false)
    }
  }, [authState])

  return authorized
}
