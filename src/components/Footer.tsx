'use client'
import Link from 'next/link'
import {
  AiFillYoutube,
  AiFillFacebook,
  AiFillTwitterCircle
} from 'react-icons/ai'
import { BsTwitch } from 'react-icons/bs'

export const Footer = () => {
  return (
    <div className="flex items-center justify-center pt-20">
      <div className="max-w-1200px px-20">
        <div className="text-center flex-col-reverse md:flex-row flex justify-center">
            <p className="text-extra-small align-left text-white-opacity mt-5 pb-10">
              DevGru Soltions, Inc.
            <br/>
       Join Our Community And Follow Us To Stay Up To Date With The Latest News And Updates!
            </p>
        </div>
        <div className="divider" />
        <div className="text-white">
          <div className="flex justify-center space-x-10">
            <Link href="/" className="text-white no-underline">
              {/* Logo here */}
            </Link>
            <Link href="/" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/" className="hover:text-white">
              Terms & Conditions
              <br />
              </Link>
          <div className="flex text-center justify-center space-x-10 py-1">
            <Link
              href="https://www.youtube.com/"
              className="w-25 text-white"
            >
              <AiFillYoutube />
            </Link>
            <Link
              href="https://www.twitch.tv/"
              className="w-25 text-white"
            >
              <BsTwitch />
            </Link>
            <Link
              href="https://www.facebook.com/"
              className="w-25 text-white"
            >
              <AiFillFacebook />
            </Link>
            <Link
              href="https://twitter.com/"
              className="w-25 text-white"
            >
              <AiFillTwitterCircle />
              </Link>
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
