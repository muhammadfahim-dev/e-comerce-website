import mongoose, { Schema } from "mongoose"


const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Food Processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)
export { Order }