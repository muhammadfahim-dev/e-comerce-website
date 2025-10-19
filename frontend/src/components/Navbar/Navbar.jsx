import React, { useState } from 'react'
import { assets } from "../../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { useFoodStore } from '../../Contexts/StoreContext'

function Navbar({ setShowLogin }) {

  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useFoodStore()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='flex md:flex justify-between items-center py-5 w-[90%] mx-auto relative'>
      <Link to={`/`}><img src={assets.logo} alt="" className='w-[150px]' /></Link>
      <ul className="hidden md:flex navbar-menu  list-none gap-7 text-[#49557e] text-[16px]">
        <Link to={`/`} onClick={() => setMenu('home')} className={`${menu === "home" ? 'underline' : "no-underline"} cursor-pointer`}>Home</Link>
        <a href='#menu' onClick={() => setMenu('menu')} className={`${menu === "menu" ? 'underline' : "no-underline"} cursor-pointer`} >Menu</a>
        <a href='#app' onClick={() => setMenu('mobile-app')} className={`${menu === "mobile-app" ? 'underline' : "no-underline"} cursor-pointer`} >Mobile-app</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={`${menu === "contact-us" ? 'underline' : "no-underline"} cursor-pointer`} >Contact Us</a>
      </ul>

      <div className="navbar-right flex items-center gap-5 relative">
        <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        <div className="navbar-search-icon ">
          {
            getTotalCartAmount()
              ? <div className="w-[10px] h-[10px] bg-[tomato] rounded-xl top-[-3px] right-25 absolute  max-sm:top-3" ></div>
              : <></>
          }
          <Link to={`/cart`}><img src={assets.basket_icon} alt="" className='w-5 cursor-pointer' /></Link>
        </div>
        {
          !token
            ? <button className='w-[80px] text-[16px] text-[#49557e] bg-transparent border-1 border-[tomato] px-3 py-1 rounded-2xl cursor-pointer hover:bg-[#fff4f2] duration-200' onClick={() => setShowLogin(true)}>Sign In</button>
            : <div className="relative group w-[80px]">
              <img src={assets.profile_icon} alt="" className='w-[20px] cursor-pointer ' />
              <ul className='hidden group-hover:flex flex-col absolute z-1 right-0 bg-[#fff2ef] w-[120px] px-2 py-3 border border-[tomato] outline-2 outline-white rounded duration-200 gap-2'>
                <li onClick={() => navigate("/my-orders")} className='flex gap-2 items-center cursor-pointer'><img src={assets.bag_icon} alt="" className='w-[25px] ' /><p className='hover:text-[tomato]'>orders</p></li>
                <hr />
                <li className='flex gap-2 items-center cursor-pointer'><img src={assets.logout_icon} alt="" className='w-[25px]' /><p className='hover:text-[tomato]' onClick={logout}>Logout</p></li>
              </ul>
            </div>
        }
      </div>

      <div className="inline md:hidden"><span className="material-symbols-rounded">menu</span></div>
    </div>
  )
}

export default Navbar