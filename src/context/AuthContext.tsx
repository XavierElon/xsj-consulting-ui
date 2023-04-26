import { createContext, useState } from 'react'

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
    authToken: false,
    localUser: null,
  })

  return (
    <AuthStateContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
