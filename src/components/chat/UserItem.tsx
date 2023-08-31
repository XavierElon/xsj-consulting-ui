import Image from 'next/image'
import { UserType } from '@/types/types'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface UserItemProps {
  user: UserType
  isSelected: boolean
  onClick: (user: UserType) => void
}

const UserItem = ({ user, isSelected, onClick }: UserItemProps) => (
  <div
    key={user.id}
    className={`flex items-center w-full mt-2 pt-2 pl-2 cursor-pointer ${isSelected ? 'bg-gray-300 py-2 px-4 rounded-lg' : ' bg-inherit'}`}
    onClick={() => onClick(user)}
  >
    <div className="chat-image avatar">
      <div className="w-10 rounded-full mr-2">
        {user.profilePicture ? (
          <Image alt="profilePicture" width="15" height="15" src={user.profilePicture}></Image>
        ) : (
          <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '45px' }}></AccountCircleIcon>
        )}
      </div>
    </div>
    <p className="text-black font-bold">{user.username}</p>
  </div>
)

export default UserItem
