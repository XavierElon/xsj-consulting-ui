// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
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
          },
          username: displayName
        })
        .then((response) => {
          console.log(response.data.user._id)
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('username', displayName)
          localStorage.setItem('id', response.data.user._id.toString())
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
