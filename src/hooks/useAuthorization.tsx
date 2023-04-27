import { useContext, useEffect, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'

export const useAuthorization = () => {
  const [authorized, setAuthorized] = useState(false)
  const { authState, getLoggedInUser } = useContext(AuthStateContext)
  console.log(authState)

  useEffect(() => {
    console.log('here')
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
