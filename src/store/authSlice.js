import { createSlice } from "@reduxjs/toolkit";




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