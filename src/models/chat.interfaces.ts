import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface MessageInterface {
  id?: string
  senderID: string
  text: string
  username: string
  createdAt: firebase.firestore.Timestamp
  read?: boolean
  readTime?: firebase.firestore.Timestamp
}

export interface ConversationInterface {
  id?: string
  users: string[]
  title?: string
  messages?: MessageInterface[]
  createdAt: firebase.firestore.Timestamp
  lastRead?: { [key: string]: firebase.firestore.Timestamp }
}

export interface onlineStatus {
  online: boolean
  lastActiveTimestamp: firebase.firestore.Timestamp
}
