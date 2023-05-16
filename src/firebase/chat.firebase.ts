import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { db } from './firebase'
import { arrayUnion, collection, doc, addDoc, serverTimestamp, getDoc, setDoc, updateDoc, where, query, getDocs } from 'firebase/firestore'
import { Conversation, Message } from '@/models/chat.interfaces'

// export const addMessage = async (conversationID: string, senderID: string, text: string): Promise<void> => {
//   // Define the message data
//   const message = {
//     senderID: senderID,
//     text: text,
//     createdAt: serverTimestamp() // Use server timestamp
//   }

//   // Add a new document to the 'messages' sub-collection of the specified conversation
//   await updateDoc(doc(db, 'conversations', conversationID), {
//     messages: arrayUnion(message)
//   })
// }

export const createOrUpdateConversation = async (user1ID: string, user2ID: string, text: string): Promise<void> => {
  // const q = query(collection(db, 'conversations'), where('users', 'array-contains', [user1ID, user2ID]))
  const userIDsCombined = user1ID < user2ID ? user1ID + '_' + user2ID : user2ID + '_' + user1ID
  const q = query(collection(db, 'conversations'), where('usersCombined', '==', userIDsCombined))
  const querySnapshot = await getDocs(q)

  let conversationRef
  if (!querySnapshot.empty) {
    conversationRef = doc(db, 'conversations', querySnapshot.docs[0].id)
  } else {
    const conversation: Conversation = {
      usersCombined: userIDsCombined,
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

export const getConversationsForUser = async (userID: string): Promise<Conversation[]> => {
  // Query the 'conversations' collection where 'users' array contains the userID
  const q = collection(db, 'conversations')
  const querySnapshot = await getDocs(q)
  console.log(userID)
  const conversations = querySnapshot.docs
    .map((doc) => {
      const data = doc.data()
      return {
        usersCombined: data.usersCombined,
        createdAt: data.createdAt,
        messages: getMessagesForConversation(doc.id)
      } as Conversation
    })
    .filter((conversation) => {
      console.log(conversation.usersCombined)
      conversation.usersCombined.includes(userID)
    })
  console.log(conversations)
  return conversations
}

export const getMessagesForConversation = async (conversationID: string): Promise<Message[]> => {
  const messagesCollection = collection(db, 'conversations', conversationID, 'messages')
  const querySnapshot = await getDocs(messagesCollection)

  const messages = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      senderID: data.senderID,
      text: data.text,
      createdAt: data.createdAt
    } as Message
  })

  return messages
}
