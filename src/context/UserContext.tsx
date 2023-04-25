import { createContext, useState } from 'react'

type ContextInterface = {
  uid: any
  setUid: any
  email: any
  setEmail: any
  otp: any
  setOtp: any
}
const LocalUserStateContext = createContext<ContextInterface>({
  uid: null,
  setUid: null,
  email: null,
  setEmail: null,
  otp: null,
  setOtp: null,
})

const LocalUserStateProvider = (props: any) => {
  const [uid, setUid] = useState()
  const [email, setEmail] = useState()
  const [otp, setOtp] = useState()

  return (
    <LocalUserStateContext.Provider
      value={{
        uid,
        setUid,
        email,
        setEmail,
        otp,
        setOtp,
      }}
    >
      {props.children}
    </LocalUserStateContext.Provider>
  )
}

export { LocalUserStateContext, LocalUserStateProvider }
