import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface MessageInterface {
  id?: string
  senderID: string
  text: string
  username: string
  createdAt: firebase.firestore.FieldValue
}

export interface ConversationInterface {
  id?: string
  users: string[]
  title?: string
  messages?: MessageInterface[]
  createdAt: firebase.firestore.FieldValue
}
