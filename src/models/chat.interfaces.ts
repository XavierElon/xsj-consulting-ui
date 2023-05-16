import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface Message {
  senderID: string
  text: string
  createdAt: firebase.firestore.FieldValue
}

export interface Conversation {
  users: string[]
  createdAt: firebase.firestore.FieldValue
}
