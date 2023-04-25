'use client'
import { NextPage } from 'next'
import React from 'react'
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

const HomePage: NextPage = () => {
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
