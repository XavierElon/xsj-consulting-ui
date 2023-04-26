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
    if (user) {
      setGoogleAuth()
    }
  }, [user])

  const setGoogleAuth = () => {
    const { accessToken, displayName, email, photoURL, uid } = user
    const firebaseObj: any = {
      firebaseGoogle: {
        displayName: displayName,
        email: email,
        firebaseUid: uid,
        photoURL: photoURL,
        refreshToken: localStorage.getItem('refreshToken'),
      },
    }
    setAuthState({
      authToken: accessToken,
      user: firebaseObj,
      provider: 'firebaseGoogle',
    })
  }

  return (
    <AuthStateContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
