import Head from 'next/head'
import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ title = '作品官網', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar></Navbar>
      <div className='container'>
        {children}
      </div>
      <Footer></Footer>
    </>
  )
}
