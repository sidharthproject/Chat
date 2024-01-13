import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'


function Home() {
 const selector = useSelector((state)=>state.auth.currentUser)
 console.log(selector);
  return (
    <div className='bg-[#a7bcff] h-[100vh] flex items-center justify-center'>
        <div className='border-[1px] border-solid border-white rounded-[10px]  h-[80%] flex overflow-hidden w-[90%]        
        md:w-[65%]'>
            <Sidebar/>
            <Chat/>
           
           
        </div>
    </div>
  )
}

export default Home