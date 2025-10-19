import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const addToCart = asyncHandler(async (req, res) => {
  const userData = await User.findById(req.body.userId)
  const cartData = userData.cartData || {}

  const { itemId } = req.body

  if (!cartData[itemId]) {
    cartData[itemId] = 1
  } else {
    cartData[itemId] += 1
  }

  await User.findByIdAndUpdate(req.body.userId, {
    $set: {
      cartData
    }
  }, { new: true })

  res.json({ success: true, message: "Added to cart" })
})

const removeFromCart = asyncHandler(async (req, res) => {
  const userData = await User.findById(req.body.userId)

  const cartData = await userData.cartData;
  if (cartData[req.body.itemId] > 0) {
    cartData[req.body.itemId] -= 1
  }

  await User.findByIdAndUpdate(req.body.userId, { cartData })
  return res.json({ success: true, message: "deleted successfully!" })
})

const getCart = asyncHandler(async (req, res) => {
  const userData = await User.findById(req.body.userId)
  const cartData = await userData?.cartData
  return res.json({ success: true, cartData })
})


export { addToCart, removeFromCart, getCart }