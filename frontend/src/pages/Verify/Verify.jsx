import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    const orderId = searchParams.get("orderId")
    const success = searchParams.get("success")
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const response = await axios.post("https://ecomerce-backend-teal.vercel.app/api/v1/order/verify", { orderId, success })

        if (response.data.success) {
            navigate("/my-orders")
        } else {
            navigate("/")
        }
    }

    useEffect(() => { verifyPayment() }, [])

    return (
        <div>Verify</div>
    )
}

export default Verify