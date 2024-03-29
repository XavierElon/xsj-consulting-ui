'use client'

import React, { useRef } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { defaultNavItems } from './defaultNavItems'
import { useOnClickOutside } from 'usehooks-ts'
// define a NavItem prop
export type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}
// add NavItem prop to component prop
type Props = {
  open: boolean
  navItems?: NavItem[]
  setOpen(open: boolean): void
}
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, (e) => {
    setOpen(false)
  })
  return (
    <div
      ref={ref}
      className={classNames({
        'bg-white': true, //colors
        'border-r border-t border-white border-opacity-10': true, //colors
        'max-width-104 h-full': true, //layout
        'fixed z-20': true, //positioning
        'transition-all duration-300': true, //animation
        'transform -translate-x-full': !open, //animation
        'translate-x-0': open, //animation
      })}
    >
      <nav className="md:sticky top-0 md:top-16 z-1">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2 z-1">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    'text-[#0061EB] hover:bg-[#022cac] hover:text-white': true, //colors
                    'flex gap-4 items-center ': true, //layout
                    'transition-colors duration-300': true, //animation
                    'rounded-md p-2 mx-2': true, //self style
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
export default Sidebar
