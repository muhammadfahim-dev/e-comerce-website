import React from 'react'
import { menu_list } from "../../assets/assets"

function ExploreMenu({ category, setCategory }) {
    return (
        <div className='flex flex-col gap-5 pt-5 text-[#262626] select-none'>
            <h1 className='text-2xl font-bold'>Explore Our Menu</h1>
            <p className='text-[11px] max-w-[60%] text-[#808080] font-md'>choose from a diverse menu featuring delectable array of dishes crafted with the finest ingredients and culinary expertise . Our mission is to satisfy your cravings and elevate your dining experience, One delicious meal at a time.</p>
            <div className="flex gap-10 items-center overflow-x-auto my-7 text-center select-none w-full h-40 scrollbar-hide">
                {menu_list.map((item, index) => (
                    <div key={index} className="flex-shrink-0 cursor-pointer" onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}>
                        <img src={item.menu_image} alt="" className={`w-full h-25 object-cover ${category === item.menu_name ? 'border-3 rounded-full border-[tomato]' : ''}`} />
                        <p className='text-ml text-[#747474] mt-5'>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr className='h-1 bg-gray-300 border-none my-2' />
        </div>
    )
}

export default ExploreMenu