'use client'
import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import Image from 'next/image'
import { UserType } from '@/types/types'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { CSSProperties } from 'react'
import { db, realtimeDB } from '@/firebase/firebase'
import { setOnlineStatusForUser } from '@/firebase/onlineStatus'
import { doc, onSnapshot } from 'firebase/firestore'

interface UserItemProps {
  user: UserType
  isSelected: boolean
  onClick: (user: UserType) => void
  unreadCount: number
}

const UserItem = ({ user, isSelected, onClick, unreadCount }: UserItemProps) => {
  const [isOnline, setIsOnline] = useState<boolean>()

  useEffect(() => {
    const userRef = doc(db, `/status/${user.id}/`)
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setIsOnline(doc.data().state === 'online')
        setIsOnline(true)
      }
    })

    // Clean up the listener
    return () => unsubscribe()
  }, [user.id])

  useEffect(() => {
    const statusRef = ref(realtimeDB, `/status/${user.id}`)
    onValue(statusRef, (snapshot) => {
      const status = snapshot.val()
      if (status) {
        setOnlineStatusForUser(user.id, status.state === 'online')
      }

      if (status.state === 'online') {
        setIsOnline(true)
      }
    })
  }, [])

  return (
    <div key={user.id} className={`flex items-center w-full mt-2 pt-2 pl-2 cursor-pointer ${isSelected ? 'bg-gray-300 py-2 px-4 rounded-lg' : ' bg-inherit'}`} onClick={() => onClick(user)}>
      <div>{!isOnline ? <span style={onlineStatusStyle}></span> : null}</div>
      <div className="relative chat-image avatar w-12 h-12 rounded-full overflow-hidden mr-2">
        {user.profilePicture ? (
          <Image alt="profilePicture" width="15" height="15" src={user.profilePicture}></Image>
        ) : (
          <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
        )}
        {isOnline && <span style={onlineStatusStyle}></span>}
      </div>
      <div className="flex items-center">
        <p className="text-black font-bold">{user.username}</p>
        {unreadCount > 0 && (
          <span style={badgeStyle} className="ml-2">
            {unreadCount}
          </span>
        )}{' '}
      </div>
    </div>
  )
}

export default UserItem

const badgeStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.25em 0.5em',
  fontSize: '0.75em',
  fontWeight: 700,
  color: '#fff',
  backgroundColor: '#f00',
  borderRadius: '0.5em',
  minWidth: '20px',
  textAlign: 'center'
}

const onlineStatusStyle: CSSProperties = {
  height: '10px',
  width: '10px',
  backgroundColor: 'green',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'absolute', // Absolute positioning
  bottom: '5px', // Align to bottom
  right: '5px', // Align to right
  border: '2px solid white' // Optional: Add white border to make it stand out against the icon or image
}
