'use client'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import axios from 'axios'
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
  axios.defaults.withCredentials = true

  // useEffect(() => {

  // })
  return (
    <>
      <div className="stars" />
      <Layout>
        <ToastContainer autoClose={1000} />
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
