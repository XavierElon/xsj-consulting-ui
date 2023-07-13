'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import Message from './Message'
import { getUsersConversations, markMessageAsRead } from '@/firebase/chat.firebase'
import useChatListener from '@/hooks/useChatListener'
import './ChatBox.css'
import { checkIfMessageRead } from '@/utils/firebase.helpers'
import { MessageInterface } from '@/models/chat.interfaces'

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { setConversations, currentConversationID } = useContext(ChatStateContext)
  const messages = useChatListener(currentConversationID!)
  const { authState } = useContext(AuthStateContext)
  const { id } = authState
  let lastMessage: MessageInterface
  let isLastMessageRead: boolean = false

  useEffect(() => {
    console.log(messages)
    if (messages) {
      lastMessage = messages[messages.length - 1]
      console.log(lastMessage)
      if (lastMessage && lastMessage?.senderID !== id) {
        isLastMessageRead = checkIfMessageRead(lastMessage, id)
        console.log(isLastMessageRead)
        if (!isLastMessageRead) {
          markMessageAsRead(currentConversationID!, lastMessage.id!, lastMessage.senderID)
        }
      }
    }
  }, [currentConversationID, messages])

  const updateConversations = async () => {
    const updatedConversations = await getUsersConversations(id)
    setConversations(updatedConversations)
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    updateConversations()
  }, [])

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full pt-16">
      <div ref={messagesEndRef}></div>
      {messages.map((message: any) => (
        <Message key={message.id} message={message} isLastMessageRead={isLastMessageRead} />
      ))}
    </div>
  )
}

export default ChatBox
