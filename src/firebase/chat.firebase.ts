import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { db } from './firebase'
import { getFirestore, collection, doc, addDoc, serverTimestamp } from 'firebase/firestore'
import { Conversation, Message } from '@/models/chat.interfaces'

export const addMessage = async (coversationID: string, sendID: string, text: string): Promise<void> => {
  // Define the message data
  const message = {
    senderID: '9nerH93NsQVn763sNbb5ReaBBtf2',
    text: 'Achilles',
    createdAt: serverTimestamp() // Use server timestamp
  }

  // Add a new document to the 'messages' sub-collection of the specified conversation
  await addDoc(collection(db, 'conversations', 'UmynCD80XhdUWlPnuh5E', 'messages'), message)
}

export const createConversation = async (): Promise<void> => {
  const conversation: Omit<Conversation, 'messages'> = {
    user1ID: '9nerH93NsQVn763sNbb5ReaBBtf2',
    user2ID: '64625b547fd59b990d3d29e2'
  }
  console.log('here')

  await addDoc(collection(db, 'conversations'), {
    ...conversation,
    createdAt: serverTimestamp()
  })
}
