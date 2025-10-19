import React from 'react'
import { assets } from '../../assets/assets'

function AppDownload() {
    return (
        <div className='w-full mx-auto text-center my-15'>
            <p className='text-xl font-medium md:text-3xl md:font-medium'>For Better Experience Download</p>
            <p className='text-xl font-medium md:text-3xl md:font-medium'>Tomato App</p>
            <div className="flex justify-center items-center mt-3 gap-5 md:gap-7">
                <img src={assets.play_store} alt="" className='w-[100px] md:w-[150px] hover:scale-105 cursor-pointer duration-200' />
                <img src={assets.app_store} alt="" className='w-[100px] md:w-[150px] hover:scale-105 cursor-pointer duration-200' />
            </div>
        </div>
    )
}

export default AppDownload