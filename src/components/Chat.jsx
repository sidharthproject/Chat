import React from 'react'
import { FaVideo } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { TfiMoreAlt } from "react-icons/tfi";
import Messeges from './Messeges';
import Enter from './Enter';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import auth from '../store/store'




function Chat() {

  const chatselector = useSelector((state)=>state.chat.user)
  const  selector = useSelector((state)=>state.auth.currentUser)
  console.log(selector.photoURL);

  return (
    <>
    { chatselector &&
    <div className='flex-[2] flex flex-col '>
        <div className='h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-gray-100'>
            <span className='font-bold'>{chatselector.displayName}</span>
            <div className='flex gap-3' >
         <FaVideo className='h-[24px] '/>
         <TiUserAdd  className='h-[24px] '/>
         < TfiMoreAlt className='h-[24px] '/>         
            </div>           
        </div>
        <Messeges/>
        <Enter/>
    </div>
}
  
    </>
  )
}

export default Chat