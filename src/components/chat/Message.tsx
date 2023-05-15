import { useContext } from 'react'
import { AuthStateContext } from '@/context/AuthContext'

const Message = (message: any) => {
  const { authState } = useContext(AuthStateContext)

  const {
    authState: {
      user: { email },
    },
    authState: { provider },
  } = useContext(AuthStateContext)

  console.log(message)
  return (
    <div>
      <div className={}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} />
          </div>
        </div>
        <div className="chat-header">{message.name}</div>
        <div className="chat-bubble">{message.text}</div>
      </div>
    </div>
  )
}

export default Message
