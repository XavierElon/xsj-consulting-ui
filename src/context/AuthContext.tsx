import { createContext, useEffect, useState } from 'react'
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
  const [authState, setAuthState] = useState({
    authToken: '',
    user: '',
    provider: '',
  })

  const getLoggedInUser = async (id: any) => {
    axios
      .get(`http://localhost:1017/profile/${id}`, { withCredentials: true })
      .then((result) => {
        console.log(result)
        const provider = result.data.user.provider
        const authToken = result.data.authToken
        if (provider === 'local') {
          setUserState(result.data.user.local, authToken)
        } else {
          setUserState(result.data.user.firebaseGoogle, authToken)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setUserState = (userData: any, authToken: any) => {
    setAuthState({
      authToken: authToken,
      user: userData,
      provider: 'local',
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
