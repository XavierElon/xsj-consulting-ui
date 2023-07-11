'use client'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import SendMessage from '@/components/chat/SendMessage'
import ChatBox from '@/components/chat/ChatBox'
import { useAuthorization } from '@/hooks/useAuthorization'
import Sidebar from '@/components/navigation/Sidebar'
import Navbar from '@/components/navigation/Navbar'
import UsersList from '@/components/chat/UsersList'
import Forbidden from '../forbidden/page'
import ChatGPTList from '@/components/chat/ChatGPTList'

const Chat: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  let authorized: boolean | null = null
  authorized = useAuthorization()

  useEffect(() => {
    if (authorized !== null) {
      setLoading(false)
    }
  }, [authorized])

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"></div>
  }

  const returnHome = () => {
    router.push('/')
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
              <div className="overflow-y-scroll flex-grow w-full">
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
        <>{returnHome()}</>
      )}
    </>
  )
}

export default Chat
