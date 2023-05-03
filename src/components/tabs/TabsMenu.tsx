'use client'
import React from 'react'

interface Props {
  accountSelected: boolean
  handleAccountTab: () => void
  settingsSelected: boolean
  handleSettingsTab: () => void
  paymentsSelected: boolean
  handlePaymentsTab: () => void
}

const TabsMenu = (props: Props) => {
  const {
    accountSelected,
    handleAccountTab,
    settingsSelected,
    handleSettingsTab,
    paymentsSelected,
    handlePaymentsTab,
  } = props

  return (
    <>
      <div className="w-full bg-white mr-10 border-t-slate-200 border-b-slate-200 border-t-2 border-b-2">
        <div className="container mx-auto ">
          <div className="w-5/6 ml-auto">
            <ul className="flex h-full">
              <li
                className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                  accountSelected ? 'bg-slate-200' : ''
                }`}
                onClick={handleAccountTab}
              >
                Account
              </li>
              <li
                className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                  settingsSelected ? 'bg-slate-200' : ''
                }`}
                onClick={handleSettingsTab}
              >
                Settings
              </li>
              <li
                className={`text-gray-500 rounded-sm text-sm hover:bg-slate-100 hover:cursor-pointer flex items-center py-2 px-4 ${
                  paymentsSelected ? 'bg-slate-200' : ''
                }`}
                onClick={handlePaymentsTab}
              >
                Payment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TabsMenu
