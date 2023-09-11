// import { ref, onDisconnect, onValue, set } from 'firebase/database'
// import { realtimeDB } from './firebase'
// import { getDatabase } from 'firebase/database'
// import firebase from 'firebase/compat/app'

// const db = getDatabase() // Assume you have initialized Firebase already

// export const setUserOnlineStatus = (userID: string) => {
//   const userStatusDatabaseRef = ref(realtimeDB, `/status/${userID}`)

//   const isOfflineForDatabase = {
//     state: 'offline',
//     last_changed: firebase.database.ServerValue.TIMESTAMP
//   }

//   const isOnlineForDatabase = {
//     state: 'online',
//     last_changed: firebase.database.ServerValue.TIMESTAMP
//   }

//   const connectedRef = ref(realtimeDB, '.info/connected')
//   onValue(connectedRef, (snapshot) => {
//     if (snapshot.val() === false) {
//       return
//     }

//     onDisconnect(userStatusDatabaseRef)
//       .set(isOfflineForDatabase)
//       .then(() => {
//         set(userStatusDatabaseRef, isOnlineForDatabase)
//       })
//   })
// }

// export const setOnlineStatusForUser = (userID: string, isOnline: boolean) => {
//   const userStatusRef = ref(db, `users/${userID}/status`)

//   if (isOnline) {
//     set(userStatusRef, {
//       state: 'online',
//       last_changed: Date.now() // Using client-side timestamp, consider Firebase ServerValue.TIMESTAMP if you want server-assigned timestamp
//     })
//   } else {
//     set(userStatusRef, {
//       state: 'offline',
//       last_changed: Date.now() // Using client-side timestamp
//     })
//   }
// }
