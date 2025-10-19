import React from 'react'
import { assets } from "../../assets/assets"

function Footer() {
    return (
        <div className=' bg-[#323232] text-white py-10 font-poppins mt-10'>
            <div className="w-[90%] mx-auto md:flex justify-between">
                <div className='w-[400px] '>
                    <img src={assets.logo} alt="" className='pb-5 cursor-pointer' />
                    <p className='text-sm pb-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam hic atque eaque aperiam assumenda animi.</p>
                    <div className="flex gap-5 mb-3 md:mb-0">
                        <img src={assets.facebook_icon} alt="" className='cursor-pointer' />
                        <img src={assets.twitter_icon} alt="" className='cursor-pointer' />
                        <img src={assets.linkedin_icon} alt="" className='cursor-pointer' />
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold md:pb-5'>COMPANY</h2>
                    <ul className='text-sm'>
                        <li className='py-1 cursor-pointer hover:underline'>Home</li>
                        <li className='py-1 cursor-pointer hover:underline'>About</li>
                        <li className='py-1 cursor-pointer hover:underline'>Delivery</li>
                        <li className='py-1 cursor-pointer hover:underline'>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-bold mt-3 md:pb-5'>GET IN TOUCH</h2>
                    <ul>
                        <li className='py-1 cursor-pointer hover:underline'>0335-2344563</li>
                        <li className='py-1 cursor-pointer hover:underline'>0349-7880249</li>
                        <li className='py-1 cursor-pointer hover:underline'>example@example.com</li>
                    </ul>
                </div>
            </div>
            <hr className='w-[90%] mx-auto my-5  h-[2px] bg-gray-100 rounded-full' />
            <p className='text-center text-sm text-gray-300'>Copyright 2025 &copy; Tomato.com - All Right-Reserved </p>
        </div>
    )
}

export default Footer