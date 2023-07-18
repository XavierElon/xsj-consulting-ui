import 'firebase/firestore'
import { db } from './firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
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
    createdAt: serverTimestamp(),
    lastRead: {}
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
    createdAt: serverTimestamp(),
    read: false
  }

  await addDoc(collection(db, 'conversations', conversationID, 'messages'), newMessage)

  // Get the conversation document to check the title
  const conversationRef = doc(db, 'conversations', conversationID)
  const conversationSnapshot = await getDoc(conversationRef)

  // If the title is 'New Chat', it means it's the first message of the conversation
  if (conversationSnapshot.data()?.title === 'New Chat') {
    let newTitle = text.slice(0, 20)
    if (text.length > 20) newTitle += '...'

    // Update the conversation title
    await updateDoc(conversationRef, {
      title: newTitle
    })
  }
}

export const markMessageAsRead = async (conversationID: string, messageID: string, userID: string) => {
  const messageRef = doc(db, 'conversations', conversationID, 'messages', messageID)
  await updateDoc(messageRef, {
    read: true
  })

  // Update the conversation
  const conversationRef = doc(db, 'conversations', conversationID)
  await updateDoc(conversationRef, {
    lastRead: {
      ...firebase.firestore.FieldValue.serverTimestamp(), // Make sure to spread the existing values
      [userID]: firebase.firestore.FieldValue.serverTimestamp() // This will overwrite the timestamp for this user
    }
  })
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
      username: data.username,
      createdAt: data.createdAt,
      read: data.read
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
