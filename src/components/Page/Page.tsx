import React from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './Page.css'

export const Page: React.FC = ({ children }) => {
  return (
    <> 
    <Header />
    {children}
    <Footer />
    </>
  )
}
