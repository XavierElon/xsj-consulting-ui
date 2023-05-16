import { useContext } from 'react'
import { AuthStateContext } from '@/context/AuthContext'

const Message = (message: any) => {
  const { authState } = useContext(AuthStateContext)

  const {
    authState: {
      user: { email }
    },
    authState: { provider }
  } = useContext(AuthStateContext)

  console.log(message)
  console.log(message.message.text)
  return (
    <div>
      <div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} />
          </div>
        </div>
        <div className="chat-header text-black">{message.message.senderID}</div>
        <div className="chat-bubbl text-black">{message.message.text}</div>
      </div>
    </div>
  )
}

export default Message
