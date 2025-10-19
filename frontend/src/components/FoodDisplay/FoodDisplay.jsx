import React, { useContext } from 'react'
import { useFoodStore } from '../../Contexts/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


function FoodDisplay({ category }) {
    const { food_list } = useFoodStore()
    return (
        <div>
            <h2 className='text-2xl font-bold my-5'>Top Dishes Near You</h2>
            <div className="flex justify-center gap-2 md:justify-between flex-wrap">
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />)
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay