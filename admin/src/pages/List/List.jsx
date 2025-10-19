import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

function List() {

    const [listItems, setListItems] = useState([])
    const url = "http://localhost:8000"

    const fetchList = async () => {
        try {
            const response = await axios.get(`/api/v1/food/list`)

            if (response.data.success) {
                setListItems(response.data.data)
            } else {
                toast.error("Erroe")
            }
        } catch (error) {
            console.log(error.message || "something went wrong while fetching the items ")
        }
    }

    useEffect(() => { fetchList() }, [])

    const deleteItem = async (itemId) => {
        console.log(itemId)
        const response = await axios.delete(`/api/v1/food/delete`, {
            data: { id: itemId }
        })
        await fetchList()

        toast.success(response.data.message)
    }

    return (
        <div className='w-[82vw] px-10 py-5'>
            <div className="grid grid-cols-5 items-center w-full bg-[#f9f9f9] border border-[#cacaca] px-2 py-2">
                <p className='text-sm font-bold'>Image</p>
                <p className='text-sm font-bold'>Name</p>
                <p className='text-sm font-bold'>Category</p>
                <p className='text-sm font-bold'>Price</p>
                <p className='text-sm font-bold'>Action</p>
            </div>
            {
                listItems.map((item, index) => (
                    <div className="grid grid-cols-5 items-center border border-[#cacaca]" key={index}>
                        <img src={`${url}/images/${item.image}`} alt="" className='w-[50px]' />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => deleteItem(item._id)} className='cursor-pointer'>X</p>
                    </div>
                ))
            }
        </div>
    )
}

export default List