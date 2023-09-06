import { ref, onDisconnect,  onValue,  set } from 'firebase/database'
import { realtimeDB } from './firebase'
// import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import firebase from 'firebase/compat'


export const setUserOnlineStatus = (userID: string) => {{
    const userStatusDatabaseRef = ref(realtimeDB, `/status/${userID}`)

    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP
    }

    const isOnlineForDatabase = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP
    }

    const connectedRef = ref(realtimeDB, '.info/connected');
    onValue(connectedRef, (snapshot) => {
        if (snapshot.val() === false) {
            return;
        };

        onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
            set(userStatusDatabaseRef, isOnlineForDatabase);
    });
});
    })
}}