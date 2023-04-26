import { createContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

type ContextInterface = {
  authState: any
  setAuthState: any
}
const AuthStateContext = createContext<ContextInterface>({
  authState: null,
  setAuthState: null,
})

const AuthStateProvider = (props: any) => {
  const [authState, setAuthState] = useState({
    authToken: '',
    user: '',
    provider: '',
  })

  const [user] = useAuthState(auth)

  useEffect(() => {
    console.log('auth state')
    console.log(user)
  }, [])

  useEffect(() => {
    console.log('user')
    console.log(user)
    setGoogleAuth()
  }, [user])

  const setGoogleAuth = () => {
    setAuthState({
      authToken: '',
      user: '',
      provider: 'test',
    })
  }

  return (
    <AuthStateContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
