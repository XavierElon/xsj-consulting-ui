import axios from 'axios'
import { UserType } from '@/types/types'

export const fetchUsers = async (): Promise<UserType[]> => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_USERS_GET_ALL_USERS_ROUTE!, {
      withCredentials: true
    })
    return res.data.users.filter((user: UserType) => user.id !== localStorage.getItem('id'))
  } catch (error) {
    console.error(error)
    return []
  }
}
