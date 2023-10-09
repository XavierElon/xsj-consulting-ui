import { realtimeDB } from './firebase'
import { ref, onDisconnect, onValue, set, serverTimestamp } from 'firebase/database'

export const setUserOnlineStatus = (userID: string | undefined) => {
  const userStatusDatabaseRef = ref(realtimeDB, `/status/${userID}`)
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp()
  }

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp()
  }

  const connectedRef = ref(realtimeDB, '.info/connected')
  onValue(connectedRef, (snapshot: any) => {
    if (snapshot.val() === false) {
      return
    }

    onDisconnect(userStatusDatabaseRef)
      .set(isOfflineForDatabase)
      .then(() => {
        set(userStatusDatabaseRef, isOnlineForDatabase)
      })
  })
}

export const setOnlineStatusForUser = (userID: string, isOnline: boolean) => {
  const userStatusRef = ref(realtimeDB, `status/${userID}`)

  if (isOnline) {
    set(userStatusRef, {
      state: 'online',
      last_changed: serverTimestamp()
    })
  } else {
    set(userStatusRef, {
      state: 'offline',
      last_changed: serverTimestamp()
    })
  }
}
