import { useState, useEffect } from 'react'
import { collection, doc, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { MessageInterface } from '@/models/chat.interfaces'

const useChatListener = (currentConversationID: string) => {
  const [messages, setMessages] = useState<MessageInterface[]>([])

  useEffect(() => {
    let unsubscribeFromSnapshot: any = null

    if (currentConversationID) {
      const messagesRef = collection(doc(collection(db, 'conversations'), currentConversationID), 'messages')
      const messagesQuery = query(messagesRef, orderBy('createdAt'))

      unsubscribeFromSnapshot = onSnapshot(messagesQuery, (snapshot: any) => {
        const newMessages = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          senderID: doc.data().senderID,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          username: doc.data().username,
          read: doc.data().read
        }))
        setMessages(newMessages.reverse())
      })
    }

    return () => {
      if (unsubscribeFromSnapshot) {
        unsubscribeFromSnapshot()
      }
    }
  }, [currentConversationID])

  return messages
}

export default useChatListener
