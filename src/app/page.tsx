'use client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthStateContext } from '@/context/AuthContext'
import Layout from '@/components/Layout'
import {
  CardOne,
  CardTwo,
  CardThree,
  CityCard,
  TableCard,
} from '@/components/cards'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage: NextPage = (Component, pageProps) => {
  const { authState } = useContext(AuthStateContext)
  useEffect(() => {
    console.log(authState)
  }, [])

  return (
    <>
      <div className="stars" />
      <Layout>
        <ToastContainer />
        <div className="row-span-1 py-20">
          <CardOne />
        </div>

        <CityCard />

        <div className="row-span-2">
          <CardTwo />
        </div>

        <div className="row-span-1">
          <CardThree />
        </div>
        <div className="row-span-1">
          <TableCard />
        </div>
      </Layout>
    </>
  )
}

export default HomePage
