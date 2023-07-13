import { ConversationInterface, MessageInterface } from '@/models/chat.interfaces'

export const checkIfMessageRead = (message: MessageInterface, userID: string): boolean => {
  return message?.readBy ? message.readBy.includes(userID) : false
}

export const getLastReadTimestampForUser = (conversation: ConversationInterface, userID: string) => {
  return conversation.lastRead ? conversation.lastRead[userID] : null
}
