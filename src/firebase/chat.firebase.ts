import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { db } from './firebase'
import { arrayUnion, collection, doc, addDoc, serverTimestamp, getDoc, setDoc, updateDoc, where, query, getDocs } from 'firebase/firestore'
import { ConversationInterface, MessageInterface } from '@/models/chat.interfaces'

export const createChatGPTConversation = async (userID: string): Promise<any> => {
  const conversation: ConversationInterface = {
    users: [userID, 'chatGPT-3.5'],
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, 'conversations'), conversation)
  return docRef.id
}

export const createConversation = async (user1ID: string, user2ID: string, text: string): Promise<void> => {
  const conversation: ConversationInterface = {
    users: [user1ID, user2ID],
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(collection(db, 'conversations'), conversation)
  const conversationRef = doc(db, 'conversations', docRef.id)

  const newMessage: MessageInterface = {
    senderID: user2ID,
    text: text,
    createdAt: serverTimestamp()
  }

  await addDoc(collection(conversationRef, 'messages'), newMessage)
}

export const addMessageToConversation = async (conversationID: string, senderID: string, text: string): Promise<void> => {
  const newMessage: MessageInterface = {
    senderID: senderID,
    text: text,
    createdAt: serverTimestamp()
  }

  await addDoc(collection(db, 'conversations', conversationID, 'messages'), newMessage)
}

export const getConversationsForUser = async (userID: string): Promise<ConversationInterface[]> => {
  // console.log(userID)
  // Query the 'conversations' collection where 'users' array contains the userID
  const q = query(collection(db, 'conversations'), where('users', 'array-contains', userID))
  const querySnapshot = await getDocs(q)

  const conversationPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data()
    const messages = await getMessagesForConversation(doc.id)
    return {
      id: doc.id,
      users: data.users,
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
      senderID: data.senderID,
      text: data.text,
      createdAt: data.createdAt
    } as MessageInterface
  })
  const messages = await Promise.all(messagePromises)
  return messages
}
