import React from 'react'

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
        <img src={src} alt={alt} className={className}></img>
      </div>
    </>
  )
}

export default ProfilePicture
