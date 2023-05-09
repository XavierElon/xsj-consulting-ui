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
  getLoggedInUser: null,
})

const AuthStateProvider = (props: any) => {
  const [authState, setAuthState] = useState<any>({
    authToken: '',
    user: '',
    provider: '',
    id: '',
    isLoggedIn: false,
  })

  // useEffect(() => {
  //   console.log('here')
  //   if (authState.user) {
  //     sessionStorage.setItem('id', authState.id)
  //     sessionStorage.setItem('isLoggedIn', 'true')
  //     sessionStorage.setItem('firstName', authState?.user.firstName)
  //     sessionStorage.setItem('lastName', authState?.user.lastName)
  //     sessionStorage.setItem('email', authState?.user.email)
  //     sessionStorage.setItem('provider', authState.provider)
  //   }
  // })

  const getLoggedInUser = useCallback(async (id: any) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_USERS_GET_PROFILE_ROUTE}/${id}`, {
        withCredentials: true,
      })
      .then((result) => {
        const provider = result.data.user.provider
        const authToken = result.data.authToken
        if (provider === 'local') {
          setUserState(result.data.user.local, authToken, 'local', id, true)
        } else {
          setUserState(
            result.data.user.firebaseGoogle,
            authToken,
            'firebaseGoogle',
            id,
            true
          )
        }
      })
      .catch((error) => {
        // sessionStorage.clear()
        console.log(error)
      })
  }, [])

  const setUserState = (
    userData: any,
    authToken: any,
    provider: string,
    id: string,
    isLoggedIn: boolean
  ) => {
    setAuthState({
      authToken: authToken,
      user: userData,
      provider: provider,
      id: id,
      isLoggedIn: isLoggedIn,
    })
  }

  return (
    <AuthStateContext.Provider
      value={{ authState, setAuthState, getLoggedInUser }}
    >
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
