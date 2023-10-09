// import { onValue, ref } from "firebase/database"
// import { realtimeDB } from "./firebase"

// export const listenForUnreadMessages = (conversationId: string) => {
//     const messagesRef = ref(realtimeDB, `/messages/${conversationId}`)
//     onValue(messagesRef, (snapshot) => {
//         const messages = snapshot.val()
//         updateUnreadCount(messages, conversationId)
//     })
// }

// const updateUnreadCount = (messages: any, conversationId: string) => {
//     const unreadMessages = Object.values(messages || {}).filter(
//       (message: any) => message.status === 'unread' && message.sender !== id // assuming `status` and `sender` are fields in your message
//     );
//     setUnreadCounts((prevCounts) => ({
//       ...prevCounts,
//       [conversationId]: unreadMessages.length,
//     }));
//   }
