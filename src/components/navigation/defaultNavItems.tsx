import React from 'react'
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import StoreIcon from '@mui/icons-material/Store'
import { NavItem } from './Sidebar'

export const defaultNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <HomeIcon className="w-6 h-6 " />,
  },
  {
    label: 'Store',
    href: '/store',
    icon: <StoreIcon className="w-6 h-6" />,
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  // {
  //   label: 'Projects',
  //   href: '/projects',
  //   icon: <FolderIcon className="w-6 h-6" />,
  // },
  // {
  //   label: 'Calendar',
  //   href: '/calendar',
  //   icon: <CalendarIcon className="w-6 h-6" />,
  // },
]
