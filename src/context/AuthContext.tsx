'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

type ContextInterface = {
  authState: any
  setAuthState: any
  getLoggedInUser: any
}
const AuthStateContext = createContext<ContextInterface>({
  authState: null,
  setAuthState: null,
  getLoggedInUser: null
})

const AuthStateProvider = (props: any) => {
  const [authState, setAuthState] = useState<any>({
    authToken: '',
    user: '',
    provider: '',
    id: '',
    isLoggedIn: false,
    username: '',
    profilePicture: ''
  })

  const getLoggedInUser = useCallback(async (id: any) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_USERS_GET_PROFILE_ROUTE}/${id}`, {
        withCredentials: true
      })
      .then((result) => {
        const provider = result.data.user.provider
        const authToken = result.data.authToken
        if (provider === 'local') {
          setUserState(authToken, result.data.user.local, 'local', id, true, result.data.user.username, result.data.user.profilePicture)
        } else {
          setUserState(
            authToken,
            result.data.user.firebaseGoogle,
            'firebaseGoogle',
            id,
            true,
            result.data.user.username,
            result.data.user.profilePicture
          )
        }
      })
      .catch((error) => {
        console.error(error)
        localStorage.clear()
        setUserState('', '', '', '', false, '', '')
      })
  }, [])

  const setUserState = (
    authToken: any,
    userData: any,
    provider: string,
    id: string,
    isLoggedIn: boolean,
    username: string,
    profilePicture: string
  ) => {
    setAuthState({
      authToken: authToken,
      user: userData,
      provider: provider,
      id: id,
      isLoggedIn: isLoggedIn,
      username: username,
      profilePicture: profilePicture
    })
  }

  // Sets auth state every time user opens tab and is already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('id')) {
      const id = localStorage.getItem('id')
      getLoggedInUser(id)
    }
  }, [])

  return <AuthStateContext.Provider value={{ authState, setAuthState, getLoggedInUser }}>{props.children}</AuthStateContext.Provider>
}

export { AuthStateContext, AuthStateProvider }
