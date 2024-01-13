import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'


function Message({message}) {
  const selector = useSelector((state)=>state.auth.currentUser)
  const chatselector = useSelector((state)=>state.chat)

 
  const ref = useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"}) 
    },[message])
  return (
  <>

    <div  ref={ref} className={`flex gap-[20px]  mb-[20px] ${message.senderId === selector.uid && "flex-row-reverse"}`}>
     
        <div className='flex flex-col text-gray-500 font-[300]'>
        <img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={message.senderId === selector.uid ? selector.photoURL:chatselector.user.photoURL} alt="" />
           <span>just now</span>
        </div>
        <div className='max-w-[80%]  flex flex-col gap-[10px]'>
            <p className={`bg-white py-[10px] px-[20px] flex items-center max-w-[max-content] justify-center h-[35px] rounded-es-xl rounded-se-xl rounded-ee-xl ${message.senderId === selector.uid && "bg-purple-500 text-white"}`}>{message.text}</p>
           {message.img && <img className='h-[100px] ' src={message.img} alt="" />}
        </div>
    </div>

   </>
  )
  
}

export default Message