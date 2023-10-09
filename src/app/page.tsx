'use client'
import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import { CardTwo, CityCard, TableCard } from '@/components/cards'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Matrix from '../components/effects/MatrixRain'

const HomePage: NextPage = (Component, pageProps) => {
  axios.defaults.withCredentials = true

  return (
    <>
      <div className="stars" />
      <Layout>
        <ToastContainer autoClose={1000} />
        <CityCard />

        <Matrix>
          <div className="justify-center items-center flex">
            <CardTwo />
          </div>
        </Matrix>
      </Layout>
    </>
  )
}

export default HomePage
