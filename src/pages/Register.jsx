import React, { useState } from 'react'
 import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
 import {auth,storage,db} from "../firebase" 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc,setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { data } from '../store/authSlice';
import { clearChat } from '../store/chatSlice';
import { useSelector } from 'react-redux';

function Register() {
  const selector = useSelector((state)=>state.auth.currentUser)
  const dispatch = useDispatch()
  const[error,setError] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
   e.preventDefault()
   const displayName=e.target[0].value;
   const email=e.target[1].value;
   const password=e.target[2].value;
   const file=e.target[3].files[0];
   console.log(file);

   try {
    const res = await createUserWithEmailAndPassword(auth,email,password)
    
 


const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed',
(snapshot)=>{},
  
  (error) => {
    setError(true)
  }, 
  () => {
   
 getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
 
    await updateProfile(res.user,{
      displayName,
      photoURL : downloadURL
    });
    
    await setDoc(doc(db,"users",res.user.uid),{
      uid:res.user.uid,
      displayName,
      email,
      photoURL:downloadURL
    });
    await setDoc(doc(db,'userChats',res.user.uid),{
    })
    dispatch(data({displayName:res.user.displayName
      ,uid:res.user.uid
      ,photoURL:auth.currentUser.photoURL                    
    }))

      dispatch(clearChat())
    
   
   
    navigate('/')
    
    });
   
  }
); 
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div className='bg-[#a7bcff] h-[100vh] flex items-center justify-center'>
        <div className='bg-white py-[20px] px-[60px] rounded-[10px] flex flex-col gap-[10px] items-center'>
            <span className='text-[#5d5b8d]
            text-[24px] font-bold'>Lama Chat</span>
            <span className='text-[#5d5b8d] text-[12px]'>Register</span>
            <form className='flex flex-col  gap-[15px]' onSubmit={handleSubmit}>
                <input className='p-[15px] borer-none border-b-[#a7bcff]' type="text" placeholder='Enter name'/>
                <input  className='p-[15px] borer-none border-b-[#a7bcff]'type="email" placeholder='Enter Email'/>
                <input className='p-[15px] borer-none border-b-[#a7bcff]' type="password"placeholder='Enter password'/>
                <input className='p-[15px] borer-none border-b-[#a7bcff]' type="file" placeholder=''/>
                <label className='flex
                 items-center gap-[10px] text-[12px] text-[#8da4f1] cursor-pointer' htmlFor="file">
                  <img className='h-12 w-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdIQNMl1J3zo9Sc5TI-p28nY4HZZKmhjapPM4o8hvuOYjZT1NG0G6yGT-NzJ24ol36Jo&usqp=CAU" alt="" />
                  <span>Add an Avatar</span>
                </label>
                <button className='bg-[#7b96ec] text-white p-[10px] font-bold border-none cursor-pointer'>Sign Up</button>
                {error && <span>Something went wrong</span> }
            </form>
            <p className='text-[#5d5b8b] text-[12px] mt-[10px]'>you have an account ? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register