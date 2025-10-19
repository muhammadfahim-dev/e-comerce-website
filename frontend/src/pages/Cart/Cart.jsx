import React from 'react'
import { useFoodStore } from "../../Contexts/StoreContext.jsx"
import { useNavigate } from 'react-router-dom'

function Cart() {

  const navigate = useNavigate()
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useFoodStore()

  return (
    <div className='w-[90%] mx-auto'>
      <div className="">
        <div className="grid grid-cols-6 text-md font-medium text-gray-500 py-3">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className='h-1 bg-[#e2e2e2] border-none' />

        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="" key={index}>
                  <div className="grid grid-cols-6 pt-2">
                    <img src={`/images/${item.image}`} alt="" className='w-[50px] my-4' />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cursor-pointer'>X</p>
                  </div>
                  <hr className='h-1 bg-[#e2e2e2] border-none' />
                </div>
              )
            }
          })
        }
      </div>
      <div className='flex md:justify-between w-full flex-col-reverse lg:flex-row '>
        <div className="">
          <h2 className='text-md font-bold my-5'>Cart Totals</h2>
          <div className='lg:w-[500px] '>
            <div className='flex justify-between m-1'>
              <p className='text-sm text-gray-500'>Subtotal</p>
              <p className='text-sm text-gray-500'>${getTotalCartAmount()}</p>
            </div>

            <hr className='border border-gray-300 mb-5' />

            <div className='flex justify-between'>
              <p className='text-sm text-gray-500'>Delivery Fee</p>
              <p className='text-sm text-gray-500'>${getTotalCartAmount() ? 2 : 0}</p>
            </div>

            <hr className='border border-gray-300 mb-5' />

            <div className='flex justify-between py-1'>
              <h2 className='text-sm font-bold'>Total</h2>
              <h2 className='text-sm font-bold'>${getTotalCartAmount() ? getTotalCartAmount() + 2 : getTotalCartAmount() + 0}</h2>
            </div>

          </div>
          <button className='text-sm bg-[tomato] px-4 py-2 mt-3 rounded cursor-pointer' onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="mt-7 w-[400px]">
          <div className="">
            <p className='text-sm text-gray-500 mb-2'>if you have a promo code, Enter it here</p>
            <div className="bg-gray-300 w-full flex justify-between items-center">
              <input type="text" placeholder='promo code' className='border-none outline-none text-sm px-3' />
              <button className='bg-black text-white py-2 px-5 cursor-pointer'>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart