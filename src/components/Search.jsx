import React, { useState } from 'react'
import { collection, query, where,getDoc,getDocs, setDoc, updateDoc,serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { doc} from "firebase/firestore";
import { useSelector } from 'react-redux';
function Search() {
const selector = useSelector((state)=>state.auth.currentUser)
const [username,setUsername] = useState("")
const [user,setUser] = useState(null)
const [error,setError] = useState(false)
const handleSearch =async()=>{
const q = query(collection(db, "users"),
          where("displayName", "==", username))

          try {
            const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data())
            
       
          });
          } catch (error) {
            setError(true)
          }

          
        }
const handleKey = (e)=>{
   e.code=== "Enter" && handleSearch()  
}
const handleSelect  = async()=>{
  const combinedId = selector.uid>user.uid ? selector.uid + user.uid : user.uid + selector.uid
 
  try{
    const res = await getDoc(doc(db,'chats',combinedId))
  if(!res.exists()){
    //create a chat in chats collection
    await setDoc(doc(db,"chats",combinedId),{messages:[]})
    //create user chat

    await updateDoc(doc(db,"userChats",selector.uid),{
      [combinedId + ".userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL
      },[combinedId+".date"] : serverTimestamp()
    })

    await updateDoc(doc(db,"userChats",user.uid),{
      [combinedId + ".userInfo"]:{
        uid:selector.uid,
        displayName:selector.displayName,
        photoURL:selector.photoURL
      },[combinedId+".date"] : serverTimestamp()
    })
    

  }
  }catch(error){
    setUser(null)
    setUsername(" ")
  }
  
  }
  console.log(user);
  return (
    <div className='border-b-[1px] border-b-solid border-b-gray-500 py-[8px]'>
        <div className=''>
        <input onKeyDown={handleKey} className='bg-transparent text-white outline-none border-none' onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='find a user' />
        </div>
        {error && "something went wrong"}
       {user &&<div onClick={handleSelect} className='p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]'>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src={user.photoURL} alt="" />
            <div>
                <span className='font-[bolder] text-[18px]'>{user.displayName}</span>
            </div>
        </div> }
        </div>
  )
}

export default Search