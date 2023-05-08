import React from 'react'
import Image from 'next/image'

type ProfilePictureProps = {
  src: string
  alt?: string
  className?: string
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt = 'Profile picture',
  className,
}) => {
  return (
    <>
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
        <Image src={src} alt={alt} className={className}></Image>
      </div>
    </>
  )
}

export default ProfilePicture
