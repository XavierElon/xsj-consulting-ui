import React from 'react'

import ChatIcon from '@mui/icons-material/Chat'
import BoltIcon from '@mui/icons-material/Bolt'
import StoreIcon from '@mui/icons-material/Store'
import SecurityIcon from '@mui/icons-material/Security'

const features = [
  {
    title: 'Instant Messaging',
    description: 'Talk with your friends or any users',
    icon: <ChatIcon></ChatIcon>
  },
  {
    title: 'AI Chat Bots',
    description: 'Talk with several different AI models including Chat GPT',
    icon: <BoltIcon></BoltIcon>
  },
  {
    title: 'Seller Marketplace',
    description: 'Shop around and list your own items in our store',
    icon: <StoreIcon></StoreIcon>
  },
  {
    title: 'Secure User Authorization',
    description: 'Custom developed user authorization ensures your data is secure with us!',
    icon: <SecurityIcon></SecurityIcon>
  }
]

export const CardTwo = () => {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-inherit dark:bg-black pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-inherit transform translate-y-1/2"></div>

      <div className="mt-10 relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-2 md:py-2">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h2 mb-4 my-10 text-white text-5xl">DevGru Is An Industry Leader</h1>
            <p className="text-xl text-blue-400 dark:text-white">Where Our Experts Live To Deliver The Highest Impact Solutions</p>
          </div>

          {/* Items */}
          <div className="my-20 max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center p-4 bg-inherit rounded shadow-xl">
                <div className="flex-shrink-0">{feature.icon}</div>
                <h4 className="h4 mt-4 mb-1 text-blue-400">{feature.title}</h4>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardTwo
