import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export interface MessageInterface {
  id?: string
  senderID: string
  text: string
  createdAt: firebase.firestore.FieldValue
}

// export interface ConversationInterface {
//   usersCombined: string
//   createdAt: firebase.firestore.FieldValue
// }
//

export interface ConversationInterface {
  id?: string
  users: string[]
  createdAt: firebase.firestore.FieldValue
}
