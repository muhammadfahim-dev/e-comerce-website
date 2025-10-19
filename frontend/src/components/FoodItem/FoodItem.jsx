import React, { useState } from 'react'
import { assets, food_list } from '../../assets/assets'
import { useFoodStore } from '../../Contexts/StoreContext.jsx'

function FoodItem({ id, name, description, price, image }) {

  const [itemCount, setItemCount] = useState(0)
  const { addToCart, removeFromCart, cartItems } = useFoodStore()

  return (
    <div className='w-[180px] md:w-[250px] p-2 my-5 overflow-hidden bg-gray-100 rounded-xl shadow-xl relative animate-fadeIn '>
      <div className="">
        <img src={`/images/${image}`} alt="" className='w-full rounded-xl cursor-pointer' />
        {
          !cartItems[id]
            ? <img src={assets.add_icon_white} className='w-[35px] cursor-pointer absolute top-[100px] md:top-[145px] right-3' onClick={() => addToCart(id)} />
            : <div className='absolute flex gap-3 items-center top-[100px] md:top-[145px] right-8 w-[80px] justify-between'>
              <img src={assets.remove_icon_red} alt="" className='w-6 cursor-pointer' onClick={() => removeFromCart(id)} />
              <p className='text-sm font-medium'>{cartItems[id]}</p>
              <img src={assets.add_icon_green} alt="" className='w-6 cursor-pointer' onClick={() => addToCart(id)} />
            </div>
        }

        <div className="w-full flex justify-between items-center">
          <p className='text-sm md:text-[16px] font-medium'>{name}</p>
          <img src={assets.rating_starts} alt="" className='my-3 cursor-pointer md:w-[60px] w-[40px]' />
        </div>
        <p className='text-[11px] mt-2 text-[#676767]'>{description}</p>
        <p className='text-sm font-medium mt-3 text-[tomato]'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem