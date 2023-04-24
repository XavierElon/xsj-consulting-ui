'use client'
import React, { CSSProperties } from 'react'
import { Button } from '@mui/material'
import Image from 'next/image'
import GoogleLogo from 'public/google-logo.svg'

interface Props {
  style: CSSProperties
}

const GoogleLoginButton = (props: Props) => {
  const { style } = props

  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        className="inline-block text-black bg-white hover:bg-[#0061EB] rounded-lg border-gray-200 border-2 my-10 mx-10"
        sx={style}
      >
        <Image
          src={GoogleLogo}
          width="16"
          height="16"
          alt="Google"
          className="inline-block mx-2"
        />
        Sign In with Google
      </Button>
    </div>
  )
}
