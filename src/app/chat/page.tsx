'use client'
import { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import SendMessage from '@/components/chat/SendMessage'
import ChatBox from '@/components/chat/ChatBox'
import Footer from '@/components/navigation/Footer'
import Sidebar from '@/components/navigation/Sidebar'
import Navbar from '@/components/navigation/Navbar'

const Chat: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="flex-grid min-h-screen grid-rows-header">
        <Navbar open={isOpen} handleClick={() => setIsOpen(!isOpen)} />

        <div className="grid grid-cols-sidebar-content">
          <Sidebar open={isOpen} setOpen={setIsOpen} />

          <div className="flex flex-col h-screen">
            <div className="overflow-auto flex-grow relative">
              <div className="absolute inset-0">
                <ChatBox />
              </div>
            </div>
            <SendMessage />
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
