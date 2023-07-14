import { ConversationInterface, MessageInterface } from '@/models/chat.interfaces'

export const checkIfMessageRead = (message: MessageInterface): boolean | undefined => {
  return message?.read
}

export const getLastReadTimestampForUser = (conversation: ConversationInterface, userID: string) => {
  return conversation.lastRead ? conversation.lastRead[userID] : null
}
