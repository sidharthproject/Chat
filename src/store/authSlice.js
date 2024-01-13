import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";



const initialState  ={
   
    currentUser:null
}
const authSlice = createSlice({

    name:"auth",
    initialState,
    reducers:{

    data:(state,action) =>{
      state.currentUser=action.payload      
       },
    cleardata:(state)=>{
        state.currentUser=null
    }
    }            
    }
)

      
export const {data,cleardata} = authSlice.actions;
export const selector = state=>state.auth.currentUser
export default  authSlice.reducer;