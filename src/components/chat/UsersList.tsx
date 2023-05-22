'use client'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    getUsers()
    console.log(users)
    // for (let i = 0; i < users.length; i++) {
    //   let user = users[i]
    //   if (user.provider === 'local' && user.local.profilePicture) {
    //     const imageBuffer = user.local.profilePicture.data
    //     const imageType = user.local.profilePicture.contentType
    //     const base64String = Buffer.from(imageBuffer).toString('base64')

    //     const url = `data:${imageType};base64,${base64String}`
    //     user.local.profilePicture.url = url
    //     console.log(user.local.profilePicure)
    //   }
    // }
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

  return (
    <div className="pl-20 pt-16 pb-10 flex-none overflow-y-auto flex flex-col-reverse">
      {users.map((user, idx) => (
        <div key={idx}>
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
