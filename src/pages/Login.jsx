import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { data } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearChat } from '../store/chatSlice';




function Login() {
  
    const selector = useSelector((state)=>state.auth.currentUser)
    const[error,setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e)=>{
     e.preventDefault()
     
     const email=e.target[0].value;
     const password=e.target[1].value;
     
  
     try {
      
     await signInWithEmailAndPassword(auth, email, password)
     dispatch(data({displayName:auth.currentUser.displayName
      ,uid:auth.currentUser.uid
      ,photoURL:auth.currentUser.photoURL
    }))
  
      dispatch(clearChat())
    
    
      navigate("/")
     
     } catch (error) {
      setError(true)
     }
    }
  return (
    <div className='bg-[#a7bcff] h-[100vh] flex items-center justify-center'>
        <div className='bg-white py-[20px] px-[60px] rounded-[10px] flex flex-col gap-[10px] items-center'>
            <span className='text-[#5d5b8d]
            text-[24px] font-bold'>Lama Chat</span>
            <span className='text-[#5d5b8d] text-[12px]'>Register</span>
            <form onSubmit={handleSubmit} className='flex flex-col  gap-[15px]'>
              
                <input  className='p-[15px] borer-none border-b-[#a7bcff]'type="email" placeholder='Enter Email'/>
                <input className='p-[15px] borer-none border-b-[#a7bcff]' type="password"placeholder='Enter password'/>
                <button className='bg-[#7b96ec] text-white p-[10px] font-bold border-none cursor-pointer'>Sign In</button>
            </form>
            <p className='text-[#5d5b8b] text-[12px] mt-[10px]'>you have an account ? <Link to='/register'>SignUp</Link></p>
            {error && <span>Something went wrong</span>}
        </div>
    </div>
  )
}

export default Login