import { createContext, useState } from 'react'

type ContextInterface = {
  uid: any
  setUid: any
  email: any
  setEmail: any
}
const LocalUserStateContext = createContext<ContextInterface>({
  uid: null,
  setUid: null,
  email: null,
  setEmail: null,
})

const LocalUserStateProvider = (props: any) => {
  const [uid, setUid] = useState()
  const [email, setEmail] = useState()

  return (
    <LocalUserStateContext.Provider
      value={{
        uid,
        setUid,
        email,
        setEmail,
      }}
    >
      {props.children}
    </LocalUserStateContext.Provider>
  )
}

export { LocalUserStateContext, LocalUserStateProvider }
