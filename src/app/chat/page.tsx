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

          {/* <div className="grid grid-cols-sidebar-content">
            <Sidebar open={isOpen} setOpen={setIsOpen} /> */}

          <div className="flex flex-row">
            <div className="w-5/6 flex flex-col h-full">
              <div className="overflow-y-scroll relative flex-none">
                <ChatBox />
              </div>
              <SendMessage />
            </div>
            <div className="w-1/6 flex flex-col h-full bg-slate-50">
              <div className="overflow-y-scroll relative flex-none">
                <UsersList />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // </div>
        <>
          <Forbidden />
        </>
      )}
    </>
  )
}

export default Chat
