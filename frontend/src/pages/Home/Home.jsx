import React, { useState } from 'react'
import { AppDownload, ExploreMenu, FoodDisplay, Header } from '../../components'

function Home() {
  const [category, setCategory] = useState('All')
  return (
    <>
      <div className='w-[90%] mx-auto font-poppins'>
        <Header />
        <div id='menu'><ExploreMenu category={category} setCategory={setCategory} /></div>
        <div id='food'><FoodDisplay category={category} /></div>
        <div id='app'><AppDownload /></div>
      </div>
    </>
  )
}

export default Home