import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

function Add() {

    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    // useEffect(() => { console.log(data) }, [data])

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        const url = "http://localhost:8000"

        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)

        try {
            const response = await axios.post(`/api/v1/food/add`, formData)
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(null)
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error.message || "something went wrong")
            console.log(response.data)
        }
    }

    return (
        <div className='w-[82vw] px-15 py-10 '>
            <form action="" className='flex flex-col gap-3' onSubmit={onSubmitHandle}>
                <div className="w-full">
                    <p className='text-sm'>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='w-[100px] cursor-pointer' />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" required className='text-[11px] ' />
                </div>

                <div className="">
                    <p className='text-sm text-gray-500 font-medium'>Product Name</p>
                    <input type="text" name='name' placeholder='Type here' className='border-1 border-gray-400 px-2 py-2 text-sm outline-none mt-1 rounded w-[30vw]' onChange={onChangeHandler} value={data.name} />
                </div>

                <div className="">
                    <p className='text-sm text-gray-500 font-medium'>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='4' placeholder='Write Content Here' className='border-1 border-gray-400 px-2 py-2 text-sm outline-none mt-1 rounded w-[30vw]'></textarea>
                </div>

                <div className='flex gap-5'>
                    <div className="">
                        <p className='text-sm text-gray-500 font-medium'>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category" className='border-1 border-gray-400 px-2 py-1 rounded mt-2 text-sm cursor-pointer'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="">
                        <p className='text-sm text-gray-500 font-medium'>Product Price</p>
                        <input type="number" name="price" placeholder='$20' className='border border-gray-400 mt-2 w-[10vw] px-2 py-1 rounded  text-sm outline-none' onChange={onChangeHandler} value={data.price} />
                    </div>
                </div>
                <button type='submit' className='bg-black text-white text-sm py-2 rounded w-[7vw] text-center cursor-pointer'>ADD</button>
            </form>
        </div>
    )
}

export default Add