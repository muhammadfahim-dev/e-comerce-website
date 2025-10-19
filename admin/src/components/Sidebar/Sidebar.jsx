import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from "react-router-dom"

function SideBar() {
    return (
        <div className='w-[18vw] border-r min-h-[100vh]'>
            <div className="flex flex-col gap-7 items-end py-5">
                <NavLink to={`/add`} className={({ isActive }) => `${isActive ? "bg-[#fff0ed]" : ""} border flex py-2 px-2 items-center justify-start gap-2 border-r-0 sm:w-[10vw]`}>
                    <img src={assets.add_icon} alt="" className='w-[25px]' />
                    <p className='hidden sm:flex text-[10px] md:text-sm'>Add Item</p>
                </NavLink>
                <NavLink to={`/list`} className={({ isActive }) => `${isActive ? "bg-[#fff0ed]" : ""} border flex py-2 px-2 items-center justify-start gap-2 border-r-0 sm:w-[10vw]`}>
                    <img src={assets.order_icon} alt="" className='w-[25px]' />
                    <p className='hidden sm:flex text-[10px] md:text-sm'>List Item</p>
                </NavLink>
                <NavLink to={`orders`} className={({ isActive }) => `${isActive ? "bg-[#fff0ed]" : ""} border flex py-2 px-2 items-center justify-start gap-2 border-r-0 sm:w-[10vw]`}>
                    <img src={assets.order_icon} alt="" className='w-[25px]' />
                    <p className='hidden sm:flex text-[10px] md:text-sm'>Order</p>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar