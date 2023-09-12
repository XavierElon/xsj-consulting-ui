import axios, { AxiosResponse } from 'axios'
import { UserType } from '@/types/types'
import { MessageInterface } from '@/models/chat.interfaces'

export const fetchUsers = async (): Promise<UserType[]> => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_USERS_GET_ALL_USERS_ROUTE!, {
      withCredentials: true
    })
    return res.data.users.filter((user: UserType) => user.id !== localStorage.getItem('id'))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const sendChatGpt3Message = async (message: string, currentConversationID: string, messages: MessageInterface[]): Promise<AxiosResponse<any>> => {
  return await axios.post(
    process.env.NEXT_PUBLIC_CHATGPT3_CONVERSATION_ROUTE!,
    {
      message: message,
      conversationID: currentConversationID,
      messages: messages
    },
    { withCredentials: true }
  )
}

export const fetchUser = async (userID: string): Promise<UserType> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_USERS_GET_PROFILE_ROUTE}/${userID}`!, {
      withCredentials: true
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('User not found')
  }
}
