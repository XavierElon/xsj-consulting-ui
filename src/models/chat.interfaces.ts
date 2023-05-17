import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface MessageInterface {
  senderID: string
  text: string
  createdAt: firebase.firestore.FieldValue
}

export interface ConversationInterface {
  usersCombined: string
  createdAt: firebase.firestore.FieldValue
}
