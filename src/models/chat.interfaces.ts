import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface Message {
  senderID: string
  text: string
  createdAt: firebase.firestore.Timestamp
}

export interface Conversation {
  user1ID: string
  user2ID: string
  messages: Message[]
}
