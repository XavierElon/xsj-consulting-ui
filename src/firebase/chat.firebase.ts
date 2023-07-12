import 'firebase/firestore'
import { db } from './firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { ConversationInterface, MessageInterface } from '@/models/chat.interfaces'

export const createChatGPTConversation3 = async (userID: string): Promise<any> => {
  const conversation: ConversationInterface = {
    title: 'New Chat',
    users: [userID, 'chatGPT-3.5'],
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, 'conversations'), conversation)
  const conversationRef = doc(db, 'conversations', docRef.id)
  return conversationRef.id
}

export const createChatGPTConversation4 = async (userID: string): Promise<any> => {
  const conversation: ConversationInterface = {
    title: 'New Chat',
    users: [userID, 'chatGPT-4'],
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, 'conversations'), conversation)
  const conversationRef = doc(db, 'conversations', docRef.id)
  return conversationRef.id
}

export const createConversation = async (user1ID: string, user2ID: string): Promise<string> => {
  const conversation: ConversationInterface = {
    users: [user1ID, user2ID],
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, 'conversations'), conversation)
  const conversationRef = doc(db, 'conversations', docRef.id)
  return conversationRef.id
}

export const updateConversationTitle = async (conversationID: string, newTitle: string) => {
  const conversationRef = doc(db, 'conversations', conversationID)

  await updateDoc(conversationRef, {
    title: newTitle
  })
}

export const addMessageToConversation = async (conversationID: string, senderID: string, text: string, username: string): Promise<void> => {
  const newMessage: MessageInterface = {
    senderID: senderID,
    text: text,
    username: username,
    createdAt: serverTimestamp()
  }

  await addDoc(collection(db, 'conversations', conversationID, 'messages'), newMessage)
}

export const getUsersConversations = async (userID: string): Promise<ConversationInterface[]> => {
  // Query the 'conversations' collection where 'users' array contains the userID
  const q = query(collection(db, 'conversations'), where('users', 'array-contains', userID))
  const querySnapshot = await getDocs(q)

  const conversationPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data()
    const messages = await getMessagesForConversation(doc.id)
    return {
      id: doc.id,
      users: data.users,
      title: data.title,
      createdAt: data.createdAt,
      messages: messages
    } as ConversationInterface
  })
  return await Promise.all(conversationPromises)
}

export const getMessagesForConversation = async (conversationID: string): Promise<MessageInterface[]> => {
  const messagesCollection = collection(db, 'conversations', conversationID, 'messages')
  const querySnapshot = await getDocs(messagesCollection)

  const messagePromises = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      senderID: data.senderID,
      text: data.text,
      createdAt: data.createdAt
    } as MessageInterface
  })
  const messages = await Promise.all(messagePromises)
  return messages
}

export const deleteConversation = async (conversationID: string): Promise<void> => {
  try {
    const conversationRef = doc(db, 'conversations', conversationID)
    await deleteDoc(conversationRef)
  } catch (error) {
    console.error('Error deleting conversation: ' + error)
    throw error
  }
}
