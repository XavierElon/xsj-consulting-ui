'use client'
import { useState } from 'react'
import { NextPage } from 'next'
import SendMessage from '@/components/chat/SendMessage'
import ChatBox from '@/components/chat/ChatBox'
import { useAuthorization } from '@/hooks/useAuthorization'
import Sidebar from '@/components/navigation/Sidebar'
import Navbar from '@/components/navigation/Navbar'
import UsersList from '@/components/chat/UsersList'
import Forbidden from '../forbidden/page'
import ChatGPTList from '@/components/chat/ChatGPTlList'

const Chat: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  let authorized = null
  authorized = useAuthorization()

  if (authorized === null) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
  }

  return (
    <>
      {authorized ? (
        <div className="flex-grid min-h-screen grid-rows-header">
          <Navbar open={isOpen} handleClick={() => setIsOpen(!isOpen)} />

          <div className="flex flex-row flex-grow">
            <div className="w-2/12 flex flex-col-reverse bg-slate-200">
              <div className="overflow-y-scroll flex-grow">
                <ChatGPTList />
              </div>
            </div>

            <div className="w-8/12 flex flex-col h-full relative">
              <div className="overflow-y-scroll flex-grow">
                <ChatBox />
              </div>
              <div className="fixed bottom-0 w-2/3">
                <SendMessage />
              </div>
            </div>
            <div className="w-2/12 flex flex-col bg-slate-200">
              <div className="overflow-y-scroll flex-grow">
                <UsersList />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Forbidden />
        </>
      )}
    </>
  )
}

export default Chat
