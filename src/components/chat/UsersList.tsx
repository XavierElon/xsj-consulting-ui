'use client'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log(users)
  }, [[users]])

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:1017/users', {
        withCredentials: true
      })
      setUsers(res.data.users)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUserClick = (user: any) => {
    console.log('clicked')
    console.log(user)
  }

  return (
    <div className="pl-20 pt-16 pb-10 flex-none overflow-y-auto flex flex-col-reverse">
      {users.map((user, idx) => (
        <div key={idx} className="flex items-center mt-4 cursor-pointer" onClick={() => handleUserClick(user)}>
          {/* Render user information here */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full mr-2">
              {user.provider === 'firebaseGoogle' ? (
                <Image alt="profilePicture" width="15" height="15" src={user.profilePicture}></Image>
              ) : (
                <Image alt="profilePicture" width="15" height="15" src={user.profilePicture.url}></Image>
              )}
            </div>
          </div>
          <p className="text-black font-bold">{user.username}</p>
        </div>
      ))}
    </div>
  )
}

export default UsersList

const messagesContainer: CSSProperties = {
  //   maxHeight: '100%',
  overflowY: 'auto'
}
