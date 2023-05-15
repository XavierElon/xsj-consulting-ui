import { NextPage } from 'next'
import Layout from '@/components/Layout'
import SendMessage from '@/components/chat/SendMessage'

const Chat: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col justify-between min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#77cafe] to-[#0069FF] flex flex-col items-center justify-center">
            {/* Place the main content of your chat here */}
          </div>
          <SendMessage />
        </div>
      </Layout>
    </>
  )
}

export default Chat
