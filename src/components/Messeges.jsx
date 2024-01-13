import React, { useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'
function Messeges() {
  const[messeges,setMesseges] = useState([])
  const chatselector = useSelector((state)=>state.chat)



  useEffect(()=>{
    const  unsub = onSnapshot(doc(db,'chats',chatselector.chatId),(doc)=>{
      
     doc.exists() && setMesseges(doc.data().messages)
    })
    
    return ()=>{  
      unsub()
    }
  },[chatselector.chatId])
  
  return (
    <div className='bg-[#ddddf7] p-[10px] flex-1 overflow-scroll'>
      
            {
            
            messeges.map((chat)=>(
         <Message message ={chat} key={chat.id}/>
           
    ))}
       
</div>
  )
}

export default Messeges