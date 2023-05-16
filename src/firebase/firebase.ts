// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { getFirestore, collection, doc, addDoc, serverTimestamp } from 'firebase/firestore'
import { Conversation, Message } from '@/models/chat.interfaces'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC14bKfPFgMgmJ7PO09Gsi0dpkwE0GvXno',
  authDomain: 'xsj-consulting-ui-7c9e0.firebaseapp.com',
  projectId: 'xsj-consulting-ui-7c9e0',
  storageBucket: 'xsj-consulting-ui-7c9e0.appspot.com',
  messagingSenderId: '144214686445',
  appId: '1:144214686445:web:6769cbe4c47bc262dbeae4',
  measurementId: 'G-50JHYVBK16'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// export const addMessage = async (coversationID: string, sendID: string, text: string): Promise<void> => {
//   // Define the message data
//   const message = {
//     senderID: '9nerH93NsQVn763sNbb5ReaBBtf2',
//     text: 'Achilles',
//     createdAt: serverTimestamp(), // Use server timestamp
//   }

//   // Add a new document to the 'messages' sub-collection of the specified conversation
//   await addDoc(
//     collection(db, 'conversations', 'UmynCD80XhdUWlPnuh5E', 'messages'),
//     message
//   )
// }

// export const createConversation = async (): Promise<void> => {
//   const conversation: Omit<Conversation, 'messages'> = {
//     user1ID: '9nerH93NsQVn763sNbb5ReaBBtf2',
//     user2ID: '64625b547fd59b990d3d29e2',
//   }
//   console.log('here')

//   await addDoc(collection(db, 'conversations'), {
//     ...conversation,
//     createdAt: serverTimestamp(),
//   })
// }

const GoogleProvider = new GoogleAuthProvider()

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, GoogleProvider)
    .then((result: any) => {
      const displayName: string = result.user.displayName!
      const email: string = result.user.email!
      const profilePic: string = result.user.photoURL!
      const firebaseUid: string = result.user.uid
      const accessToken: string = result.user.accessToken
      const refreshToken: string = result._tokenResponse.refreshToken

      return axios
        .post(process.env.NEXT_PUBLIC_USERS_GOOGLE_AUTH_ROUTE!, {
          firebaseGoogle: {
            firebaseUid: firebaseUid,
            accessToken: accessToken,
            email: email,
            displayName: displayName,
            photoURL: profilePic,
            refreshToken: refreshToken
          }
        })
        .then((response) => {
          localStorage.setItem('name', displayName)
          localStorage.setItem('email', email)
          localStorage.setItem('profilePic', profilePic)
          return { result, response }
        })
        .catch((error) => {
          console.error(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}
