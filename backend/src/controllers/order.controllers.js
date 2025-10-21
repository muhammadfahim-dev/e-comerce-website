import { Order } from "../models/order.model.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import Stripe from "stripe"
import dotenv from "dotenv"


dotenv.config({
    path: "./.env"
})


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = asyncHandler(async (req, res) => {
    const frontend_url = "https://e-comerce-website.pages.dev/"
    const { userId, items, amount, address } = req.body

    const newOrder = await Order.create({
        userId,
        items,
        address,
        amount
    })

    await User.findByIdAndUpdate(userId, {
        $set: {
            cartData: {}
        }
    }, { new: true })

    const line_items = req.body.items.map(item => ({
        price_data: {
            currency: "pkr",
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100 * 80
        },
        quantity: item.quantity
    }))

    line_items.push({
        price_data: {
            currency: "pkr",
            product_data: {
                name: "Delivery Charges"
            },
            unit_amount: 2 * 100 * 80
        },
        quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    return res.json({ success: true, session_url: session.url })
})


const verifyOrder = asyncHandler(async (req, res) => {
    const { orderId, success } = req.body

    try {
        if (success == "true") {
            await Order.findByIdAndUpdate(orderId, {
                $set: { payment: true }
            }, { new: true })

            return res.json({ success: true, message: "Paid" })
        } else {
            await Order.findByIdAndUpdate(orderId, {
                $set: {
                    payment: false
                }
            }, { new: true })

            return res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error.message || "Error")
        return res.json({ success: false, message: "Error" })
    }
})


const userOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId })
        return res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error.message || "Error")
        return res.json({ success: false, message: "Error" })
    }
})

const listOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({})
        return res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error.message || "Error")
        return res.json({ success: false, message: "Error" })
    }
})

const updateStatus = asyncHandler(async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, {
            $set: {
                status: req.body.status
            }
        })
        return res.json({ success: true, message: "Message Updated" })
    } catch (error) {
        return res.json({ success: false, message: "Error" })
    }
})

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus }