import React, { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"
import axios from "axios";

export const storeContext = createContext(null)

const StoreContextProvider = (props) => {

    let [cartItems, setCartItems] = useState({})
    let [token, setToken] = useState("")
    const [food_list, setFood_list] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(
                "https://ecomerce-backend-teal.vercel.app/api/v1/cart/add",
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (token) {
            await axios.post('https://ecomerce-backend-teal.vercel.app/api/v1/cart/remove', { itemId }, { headers: { Authorization: `Bearer ${token}` } })
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post("https://ecomerce-backend-teal.vercel.app/api/v1/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } })

        setCartItems(response.data.cartData)
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo?.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const fetchFoodList = async () => {
        const response = await axios.get("/api/v1/food/list")
        setFood_list(response.data.data)
    }

    useEffect(() => {
        async function foodData() {
            fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        foodData()
    }, [])

    let contextValue = { food_list, addToCart, removeFromCart, setCartItems, cartItems, getTotalCartAmount, token, setToken }


    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export const useFoodStore = () => useContext(storeContext)

export default StoreContextProvider