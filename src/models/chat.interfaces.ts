import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface MessageInterface {
  id?: string
  senderID: string
  text: string
  username: string
  createdAt: firebase.firestore.FieldValue
  readBy?: string[]
}

export interface ConversationInterface {
  id?: string
  users: string[]
  title?: string
  messages?: MessageInterface[]
  createdAt: firebase.firestore.FieldValue
  lastRead?: { [key: string]: firebase.firestore.FieldValue }
}
