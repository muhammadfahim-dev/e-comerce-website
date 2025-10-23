import React, { useState } from 'react'
import { assets } from "../../assets/assets"
import axios from 'axios'
import { useFoodStore } from '../../Contexts/StoreContext'

function LoginPopup({ setShowLogin }) {

  const { token, setToken } = useFoodStore()
  let [currState, setCurrState] = useState("Login")
  let [data, setData] = useState({
    name: "",
    password: "",
    email: ""
  })

  const onChangeHandler = (event) => {
    event.preventDefault()
    const name = event.target.name
    const vlaue = event.target.value

    setData(prev => ({ ...prev, [name]: vlaue }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (currState === "Login") {
      const response = await axios.post("https://ecomerce-backend-teal.vercel.app/api/v1/user/login", data)
      if (response.data.success) {
        setToken(response.data.jwtToken)
        localStorage.setItem("token", response.data.jwtToken)
        setShowLogin(false)
      }
    } else {
      const response = await axios.post("https://ecomerce-backend-teal.vercel.app/api/v1/user/register", data)
      if (response.data.success) {
        setToken(response.data.jwtToken)
        localStorage.setItem("token", response.data.jwtToken)
        setShowLogin(false)
      }
    }
  }

  return (
    <div className='relative h-screen animate-fadeIn'>
      <form onSubmit={onSubmit} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  bg-white p-5 rounded-2xl w-[380px] shadow-lg border-gray-100 border'>
        <div className="flex justify-between text-md font-bold">
          <h2 className='mb-7'>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='cursor-pointer w-[16px] h-[16px]' />
        </div>
        <div className="flex flex-col">
          {
            currState === "Sign Up" ? <input type="text" placeholder='UserName' required className='mb-3 py-2 px-2 outline-none shadow-xl rounded-xl border border-gray-400 text-sm' onChange={onChangeHandler} value={data.name} name='name' /> : <></>
          }
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required className='mb-3 py-2 px-1 outline-none shadow-xl rounded-xl border border-gray-400 text-sm' />

          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className='mb-5 py-2 px-1 outline-none shadow-xl rounded-xl border border-gray-400 text-sm' />
        </div>
        <button type='submit' className='w-full bg-[tomato] py-2 rounded-xl text-[12px] cursor-pointer'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="flex justify-between items-center">
          <input type="checkbox" required className='cursor-pointer' />
          <p className='text-sm ml-4 mt-5'>By continuing , i agree to the terms of & privacy policy use</p>
        </div>
        {
          currState === "Sign Up"
            ? <p className='text-center mt-5 text-gray-600 text-sm'>Already have an account ? <span onClick={() => setCurrState("Login")} className='cursor-pointer text-[tomato] hover:underline'>Login</span> </p>
            : <p className='text-center mt-5 text-gray-600 text-sm'>Create a new account ? <span onClick={() => setCurrState("Sign Up")} className='cursor-pointer text-[tomato] hover:underline'>register</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup