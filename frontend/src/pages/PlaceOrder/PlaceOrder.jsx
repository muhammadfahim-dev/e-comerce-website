import React, { useEffect } from 'react'
import { useFoodStore } from '../../Contexts/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function PlaceOrder() {

  const navigate = useNavigate()
  const { getTotalCartAmount, token, food_list, cartItems } = useFoodStore()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const placeOrder = async (event) => {
    event.preventDefault()

    let orderItems = []
    food_list.map(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    let response = await axios.post("https://ecomerce-backend-teal.vercel.app/api/v1/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } })

    if (response.data.success) {
      const { session_url } = response.data
      window.location.replace(session_url)
    } else {
      alert("Error")
    }
  }

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='w-[90%] mx-auto flex justify-between'>
      <div className="flex flex-col gap-5 mt-5">
        <p className='text-xl font-bold mb-5 mt-5'>Delivery Information</p>

        <div className="flex gap-4">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />
        </div>

        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />

        <input type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='street' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />

        <div className="flex gap-4">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />

          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />
        </div>

        <div className="flex gap-4">
          <input name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='Zip code' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />

          <input name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />
        </div>

        <input type="" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' className=' border-1 border-gray-400 px-2 py-2 rounded outline-none text-sm' required />
      </div>

      <div className="mt-10">
        <div className="">
          <h2 className='text-md font-bold mb-5'>Cart Totals</h2>
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
          <button type='submit' className='text-sm bg-[tomato] px-4 py-2 mt-5 rounded cursor-pointer'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder