import React from 'react'
import "../../index.css"

function Header() {
    return (
        <div className='h-[40vh] md:h-[34vw] w-[100%] bg-[url(https://your-app-name.vercel.app/public/header_img.png)] bg-cover bg-no-repeat overflow-hidden rounded-2xl py-auto relative'>
            <div className="animate-[fadeIn_1.5s_ease-in-out_forwards] flex absolute flex-col gap-2 md:gap-5 items-start mx-w-[50%] bottom-5 left-5">
                <h2 className='text-md font-medium  md:text-[4.5vw]/18 md:font-medium text-white '>Order Your <br /> Favorite Food Here</h2>
                <p className='text-[10px] md:text-sm w-140 text-white'>choose from a diverse menu featuring delectable array of dishes crafted with the finest ingredients and culinary expertise . Our mission is to satisfy your cravings and elevate your dining experience, One delicious meal at a time.</p>

                <button className='bg-white text-[#747474] border-none md:px-4 md:py-2 rounded-2xl md:text-[12px] md:font-medium cursor-pointer text-[10px] px-1 py-1.5'>View Menu</button>
            </div>
        </div>
    )
}

export default Header