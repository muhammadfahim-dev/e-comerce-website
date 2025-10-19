import { useState } from 'react'
import './App.css'
import { Navbar, SideBar } from "./components"
import { Add, List, Orders } from "./pages"
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="">
      <ToastContainer />
      <Navbar />
      <hr className='h-[2px] border-none bg-[#a9a9a9]' />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
