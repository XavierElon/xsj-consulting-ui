import { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { AuthStateContext } from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  imageUrl: string
  handleFileUpload: any
}

const AccountTab = (props: Props) => {
  const { imageUrl, handleFileUpload } = props
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const { authState } = useContext(AuthStateContext)
  const { email } = authState.user
  const { provider } = authState

  return (
    <div className="mx-auto bg-white min-h-screen min-w-screen">
      <div className="flex flex-col h-full w-full container mx-auto">
        <div className="w-5/6 ml-auto">
          <div className="flex mb-4 pt-20">
            {authState.profilePicture ? (
              <>
                <Image
                  src={authState.profilePicture || ''}
                  width="100"
                  height="100"
                  alt="profilePicture"
                  referrerPolicy="no-referrer"
                  className="rounded-md transform hover:scale-110 transition-all duration-300 cursor-pointer"
                ></Image>
              </>
            ) : (
              <>
                <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative">
                  {imageUrl ? (
                    <>
                      <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                        <Image src={imageUrl} width="100" height="100" alt="profilePicture" className="w-full h-full rounded-full"></Image>
                      </div>
                    </>
                  ) : (
                    <AccountCircleIcon fontSize="inherit" color="primary" sx={{ fontSize: '100px' }}></AccountCircleIcon>
                  )}

                  <>
                    <form>
                      <input type="file" accept="image/*" name="file" onChange={handleFileUpload} className="hidden" id="fileInput"></input>

                      <label htmlFor="fileInput">
                        {isHovering && (
                          <FileUploadIcon
                            fontSize="inherit"
                            color="primary"
                            sx={{
                              fontSize: '40px',
                              position: 'absolute',
                              top: '80%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: 'white',
                              borderRadius: '50px',
                              cursor: 'pointer'
                            }}
                          />
                        )}
                      </label>
                    </form>
                  </>
                </div>
              </>
            )}

            <div className="flex flex-col ml-4">
              <p className="font-bold text-black text-3xl mb-1">{email}</p>
            </div>
          </div>
          <div className="flex items-center mt-2 px-24">
            <p className="font-bold text-black text-3xl mr-2">Sign-in method:</p>
            <p className="text-slate-500 text-xl mx-2">{authState.provider.charAt(0).toUpperCase() + authState.provider.slice(1)}</p>
            {provider === 'local' && (
              <Link href="/profile/settings/changepassword">
                <p className="text-black">Change Password</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountTab
