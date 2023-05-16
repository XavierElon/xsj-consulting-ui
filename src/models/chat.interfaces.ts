import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface Message {
  senderID: string
  text: string
  createdAt: firebase.firestore.FieldValue
}

export interface NewMessage extends Omit<Message, 'createdAt'> {
  createdAt?: firebase.firestore.Timestamp | firebase.firestore.FieldValue
}

export interface Conversation {
  users: string[]
  messages: Message[]
  createdAt: firebase.firestore.Timestamp
}
