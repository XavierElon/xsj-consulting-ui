import { Conversation, Message } from '@/models/chat.interfaces'
import firebase from 'firebase/compat/app'
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore'
import 'firebase/compat/firestore'
import { db } from './firebase'

// export async function addMessage(conversationID: string): Promise<void> {
//   const message: Omit<Message, 'createdAt'> = {
//     senderID: '64625b547fd59b990d3d29e2',
//     text: 'test',
//   }

//   await db
//     .collection('conversations')
//     .doc(conversationID)
//     .collection('messages')
//     .add({
//       ...message,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     })
// }

// export const createConversation = async (): Promise<void> => {
//   const conversation: Omit<Conversation, 'messages'> = {
//     user1ID: '9nerH93NsQVn763sNbb5ReaBBtf2',
//     user2ID: '64625b547fd59b990d3d29e2',
//   }

//   await db.collection('conversations').add({
//     ...conversation,
//     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//   })
// }
