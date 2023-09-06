'use client'
import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import { CardTwo, CityCard, TableCard } from '@/components/cards'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage: NextPage = (Component, pageProps) => {
  axios.defaults.withCredentials = true

  return (
    <>
      <div className="stars" />
      <Layout>
        <ToastContainer autoClose={1000} />

        <CityCard />

        <div className="row-span-2">
          <CardTwo />
        </div>

        <div className="row-span-1">{/* <TableCard /> */}</div>
      </Layout>
    </>
  )
}

export default HomePage
