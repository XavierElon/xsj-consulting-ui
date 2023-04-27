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

  const setLoggedInUserAuthState = async () => {}

  return (
    <AuthStateContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
