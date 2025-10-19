import React from 'react'
import { assets } from "../../assets/assets"

function Navbar() {
    return (
        <div className='flex justify-between items-center px-7 py-2'>
            <img src={assets.logo} alt="" className='w-[120px]'/>
            <img src={assets.profile_image} alt="" className='w-[40px]' />
        </div>
    )
}

export default Navbar