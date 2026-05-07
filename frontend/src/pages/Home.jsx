import React from 'react'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import PromoBanner from '../components/PromoBaner'
import NewCollection from '../components/NewCollection'

const Home = () => {
    

  return (
    <div>
      <Hero />
      <Category />
      <PromoBanner />
      <NewCollection />
      <Footer />
    </div>
      )
}

export default Home