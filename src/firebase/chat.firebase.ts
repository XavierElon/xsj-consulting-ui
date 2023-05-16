import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { db } from './firebase'
import { arrayUnion, collection, doc, addDoc, serverTimestamp, getDoc, setDoc, updateDoc, where, query, getDocs } from 'firebase/firestore'
import { Conversation, Message, NewMessage } from '@/models/chat.interfaces'

export const addMessage = async (conversationID: string, senderID: string, text: string): Promise<void> => {
  // Define the message data
  const message = {
    senderID: senderID,
    text: text,
    createdAt: serverTimestamp() // Use server timestamp
  }

  // Add a new document to the 'messages' sub-collection of the specified conversation
  await updateDoc(doc(db, 'conversations', conversationID), {
    messages: arrayUnion(message)
  })
}

export const createOrUpdateConversation = async (user1ID: string, user2ID: string, text: string): Promise<void> => {
  const q = query(collection(db, 'conversations'), where('users', 'array-contains-any', [user1ID, user2ID]))
  const querySnapshot = await getDocs(q)

  let conversationRef
  if (!querySnapshot.empty) {
    conversationRef = doc(db, 'conversations', querySnapshot.docs[0].id)
  } else {
    const conversation = {
      users: [user1ID, user2ID],
      createdAt: serverTimestamp()
    }
    const docRef = await addDoc(collection(db, 'conversations'), conversation)
    conversationRef = doc(db, 'conversations', docRef.id)
  }

  const newMessage: Message = {
    senderID: user1ID,
    text: text,
    createdAt: serverTimestamp()
  }

  await addDoc(collection(conversationRef, 'messages'), newMessage)
}
