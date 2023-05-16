import { NextPage } from 'next'
import Layout from '@/components/Layout'
import SendMessage from '@/components/chat/SendMessage'
import ChatBox from '@/components/chat/ChatBox'

const Chat: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col justify-between min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center">
            <ChatBox></ChatBox>
          </div>
          <SendMessage />
        </div>
      </Layout>
    </>
  )
}

export default Chat
