import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

function Orders() {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        const response = await axios.get("/api/v1/order/list")

        if (response.data.success) {
            setOrders(response.data.data)
        } else {
            toast.error("Error")
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post("/api/v1/order/status",
            {
                orderId,
                status: event.target.value
            }
        )

        if (response.data.success) {
            await fetchAllOrders()
        } else {

        }
    }

    useEffect(() => { fetchAllOrders() }, [])

    return (
        <div className='w-[82vw]'>
            <h3 className='pt-15 px-5 text-xl font-bold'>Orders Page</h3>
            {
                orders.map((order, index) => (
                    <div className="grid grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center border border-[tomato] my-5 mx-5  p-5" key={index}>
                        <img src={assets.parcel_icon} alt="parcel_icon" className='w-[40px] md:w-[60px]' />
                        <div className="">
                            <p className='text-sm font-bold '>
                                {
                                    order.items.map((item, index) => {
                                        if (index == order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "

                                        }
                                    })
                                }
                            </p>
                            <p className='font-bold mt-3 text-sm'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="text-sm">
                                <p>{order.address.street + ", "}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='text-sm pt-3'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} name="" id="" className='bg-[#ffe8e4] border border-[tomato] my-5 md:my-0 px-2 py-1 outline-none '>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Deliverd">Deliverd</option>
                        </select>
                    </div>
                ))
            }
        </div>
    )
}

export default Orders