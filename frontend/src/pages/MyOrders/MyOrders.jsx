import React, { useEffect, useState } from 'react'
import { useFoodStore } from "../../Contexts/StoreContext.jsx"
import axios from 'axios'
import { assets } from '../../assets/assets.js'

function MyOrders() {

    const [data, setData] = useState([])
    const { token } = useFoodStore()

    const fetchOrders = async () => {
        const response = await axios.post("/api/v1/order/userorders", {}, {
            headers: { Authorization: `Bearer ${token}` }
        })

        setData(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className=' w-[90vw] mx-auto '>
            <h2 className='text-xl font-bold mt-10'>My Orders</h2>
            <div className="flex flex-col gap-7 my-7">
                {
                    data.map((order, index) => (

                        <div className="px-2 grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] border items-center text-[14px]" key={index}>
                            <img src={assets.parcel_icon} alt="" className='w-[60px]' />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + "x" + item.quantity
                                } else {
                                    return item.name + "x" + item.quantity + ","
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span className='text-[tomato]'>&#x25cf;</span> <span className='text-sm font-medium'>{order.status}</span></p>
                            <button className='cursor-pointer bg-[#ffe1e1] text-[#454545] w-[120px] px-1 py-2 text-sm' onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrders