import React, { useState } from 'react'
import { Footer, LoginPopup, Navbar } from "./components/index.js"
import { Routes, Route } from "react-router-dom"
import { Home, Cart, PlaceOrder, Verify, MyOrders } from "./pages/index.js"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {
        showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>
      }
      <div className=' mx-auto font-Poppins'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/my-orders' element={<MyOrders />} />
        </Routes>
      </div>
      <div id="footer"><Footer /></div>
    </>
  )
}

export default App