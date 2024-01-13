import React, { useState,useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { chat } from '../store/chatSlice';





function Chats() {
    const selector = useSelector((state)=>state.auth.currentUser)
   
const [chats,setChats] = useState([])
const dispatch = useDispatch()


useEffect(()=>{
  const getChats =()=>{
  const unsub = onSnapshot(doc(db, "userChats", selector.uid), (doc) => {
    setChats(Object.entries(doc.data()));
   
  });
    return ()=>{
      unsub()
    }

  }
  {selector.uid && getChats()}

},[selector.uid]);

const handleSelect =(data)=>{

  dispatch(chat({user:data[1].userInfo ,chatId:data[0]}))
console.log(data);
  }
  
 


  return (
    <div>
      
       {chats?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>{
        
      return(
         <div key={chat[0]} onClick={()=>handleSelect(chat)}className='p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52] '>
            < img className='w-[50px] h-[50px] rounded-[50%] object-cover' src={chat[1].userInfo.photoURL} alt="" />
            <div>
                <span className='font-[bolder] text-[18px]'>{chat[1].userInfo.displayName}</span>
                <p className='text-[14px] text-gray-300'>{chat[1].lastMessage?.text}</p>
            </div>
        </div>)
   })}
    </div>
  )
}

export default Chats