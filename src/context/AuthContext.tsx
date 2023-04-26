import { createContext, useState } from 'react'

type ContextInterface = {
  authState: any
  setAuthState: React.SetStateAction<any>
}
const AuthStateContext = createContext<ContextInterface>({
  authState: null,
  setAuthState: null,
})

const AuthStateProvider = (props: any) => {
  const [authState, setAuthState] = useState({
    authToken: null,
    user: null,
    provider: null,
  })

  return (
    <AuthStateContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, AuthStateProvider }
