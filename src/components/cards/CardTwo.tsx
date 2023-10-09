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
    title: 'Secure User Authorization & Authenticaton',
    description: 'Custom developed user authorization and authentication ensures your data is secure with us!',
    icon: <SecurityIcon></SecurityIcon>
  }
]

export const CardTwo = () => {
  return (
    <section className="relative flex justify-center items-center min-h-screen">
      <div className="mt-0 relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-2 md:py-2">
          <div className="my-0 mx-auto grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center p-4 bg-white rounded shadow-xl">
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
