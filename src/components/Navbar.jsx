import React from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cleardata } from '../store/authSlice';




function Navbar() {
  const selector = useSelector((state)=>state.auth.currentUser)

  console.log(selector.photoURL);
  const dispatch = useDispatch()
  const handleClick =()=>{
   
     dispatch(cleardata())
  }

  return (
    <div className='flex items-center bg-[#2f2d52] h-[50px] p-[10px] justify-between text-[#ddddf7]'>
        <span className='font-bold hidden md:block'>Lama Chat</span>
            <div className='flex gap-[10px]'>
                <img  className='bg-[#ddddf7] h-[30px] w-[30px] rounded-[50%] object-cover' src={selector.photoURL}alt="" />
                <span className=''>{selector.displayName}</span>
                   
                <button onClick={handleClick} className='bg-[#5d5b8b] text-[#ddddf7] text-[10px] border-none cursor-pointer absolute bottom-[10px] md:static '>LogOut</button>
                </div>
        
    </div>
  )
}

export default Navbar