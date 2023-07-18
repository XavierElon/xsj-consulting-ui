'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import { ChatStateContext } from '@/context/ChatContext'
import { ConversationInterface } from '@/models/chat.interfaces'
import { createChatGPTConversation3, createChatGPTConversation4, deleteConversation, updateConversationTitle } from '@/firebase/chat.firebase'
import 'firebase/compat/firestore'
import './UsersList.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TextField from '@mui/material/TextField'

const ChatGPTList = () => {
  const [chatGPTConversations, setChatGPTConversations] = useState<any[]>([])
  const [showDeleteIcons, setShowDeleteIcons] = useState<boolean>(false)
  const [showEditTitleInput, setShowEditTitleInput] = useState<boolean>(false)
  const [isChatGpt3Selected, setIsChatGpt3Selected] = useState<boolean>(true)
  const [isChatGpt4Selected, setIsChatGpt4Selected] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>('')
  const {
    conversations,
    setCurrentConversation,
    currentConversationID,
    setCurrentConversationID,
    setIsChatGPTConversation,
    setSecondUserID,
    updateConversations
  } = useContext(ChatStateContext)
  const {
    authState: { id }
  } = useContext(AuthStateContext)

  const getConversationsWithChatGPT = (conversations: ConversationInterface[]): ConversationInterface[] => {
    const chatGPTConversations = conversations.filter(
      (conversation) => conversation.users.includes('chatGPT-4') || conversation.users.includes('chatGPT-3.5')
    )
    return chatGPTConversations ? chatGPTConversations : []
  }

  const handleSetConversation = (chatID: string) => {
    setCurrentConversationID(chatID)
    setIsChatGPTConversation(true)
    setSecondUserID('')
  }

  const handleNewChatGPTClick = async () => {
    try {
      const conversationID = await createChatGPTConversation3(id)
      updateConversations()
      setCurrentConversation(null)
      setCurrentConversationID(conversationID)
      setIsChatGPTConversation(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditChatGPTTitle = async (ConversationID: string) => {
    updateConversationTitle(ConversationID, newTitle)
    setShowEditTitleInput(false)
    updateConversations()
  }

  const handleDeleteChatGPTConversation = async (ConversationID: string) => {
    setShowDeleteIcons(true)
    try {
      await deleteConversation(ConversationID)
      updateConversations()
      setCurrentConversation(null)
      setCurrentConversationID(null)
      setIsChatGPTConversation(false)
      setShowDeleteIcons(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const convos = getConversationsWithChatGPT(conversations)
    setChatGPTConversations(convos)
  }, [conversations])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto">
        <div className="my-20">
          {chatGPTConversations.map((chat: any) => {
            const isSelected: boolean = chat.id === currentConversationID

            return (
              <div
                key={chat.id}
                className={`flex items-start justify-between mt-4 ${isSelected ? 'bg-gray-300 py-2 pl-2 rounded-lg' : 'inherit'}`}
                onClick={() => handleSetConversation(chat.id)}
              >
                <div className="flex items-center cursor-pointer">
                  <ChatBubbleOutlineIcon className="mx-4"></ChatBubbleOutlineIcon>
                  {showEditTitleInput && isSelected ? (
                    <div>
                      <TextField
                        id="outlined-size-small"
                        defaultValue={chat.title}
                        size="small"
                        onChange={(event: any) => {
                          setNewTitle(event.target.value)
                        }}
                        onKeyDown={(event: any) => {
                          if (event.key === 'Enter') {
                            handleEditChatGPTTitle(chat.id)
                          }
                        }}
                      />
                      <CheckIcon
                        style={{ color: 'black', fontSize: '30px' }}
                        className="flex justify-end items-center mx-2 font-black cursor-pointer"
                        onClick={() => handleEditChatGPTTitle(chat.id)}
                      ></CheckIcon>
                      <CloseIcon
                        style={{ color: 'black', fontSize: '30px' }}
                        className="flex justify-end mx-2 font-black cursor-pointer"
                        onClick={() => setShowEditTitleInput(false)}
                      ></CloseIcon>
                    </div>
                  ) : (
                    <h1 className="text-black font-semibold">{chat.title.length > 20 ? `${chat.title.substring(0, 20)}...` : chat.title}</h1>
                  )}
                </div>
                {showDeleteIcons && isSelected ? (
                  <div>
                    <CheckIcon
                      style={{ color: 'black', fontSize: '30px' }}
                      className="justify-end mx-2 font-black cursor-pointer"
                      onClick={() => handleDeleteChatGPTConversation(chat.id)}
                    ></CheckIcon>
                    <CloseIcon
                      style={{ color: 'black', fontSize: '30px' }}
                      className="justify-end mx-2 font-black cursor-pointer"
                      onClick={() => setShowDeleteIcons(false)}
                    ></CloseIcon>
                  </div>
                ) : isSelected && !showEditTitleInput ? (
                  <div>
                    <div>
                      <EditIcon
                        style={{ color: 'black', fontSize: '30px' }}
                        className="justify-end mx-2 font-black cursor-pointer"
                        onClick={() => setShowEditTitleInput(true)}
                      ></EditIcon>
                      <DeleteOutlineIcon
                        style={{ color: 'black', fontSize: '30px' }}
                        className="justify-end mx-2 font-black cursor-pointer"
                        onClick={() => setShowDeleteIcons(true)}
                      ></DeleteOutlineIcon>
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex justify-center border-white rounded-xl border-4 py-1 mx-4 cursor-pointer mb-5">
        <div
          onClick={() => {
            setIsChatGpt4Selected(false)
            setIsChatGpt3Selected(true)
          }}
          className={`flex-grow bg-gray-300 flex justify-center items-center py-2 ${isChatGpt3Selected ? 'bg-gray-400 rounded-xl' : 'bg-inherit'}`}
        >
          <p className={`text-xl ${isChatGpt3Selected ? 'text-white' : 'text-black'}`}>GPT-3.5</p>
        </div>
        <div
          onClick={() => {
            setIsChatGpt3Selected(false)
            setIsChatGpt4Selected(true)
          }}
          className={`flex-grow flex justify-center items-center ${isChatGpt4Selected ? 'bg-gray-400 rounded-xl text-white' : 'bg-inherit'}`}
        >
          <p className={`text-xl ${isChatGpt4Selected ? 'text-white' : 'text-black'}`}>GPT-4</p>
        </div>
      </div>
      <div className="flex justify-center border-white border-2 rounded-xl py-3 mx-4 cursor-pointer mb-5 bg-gray-400" onClick={handleNewChatGPTClick}>
        <p className="justify-center text-white text-xl justify-between">New Chat</p>
      </div>
    </div>
  )
}

export default ChatGPTList
