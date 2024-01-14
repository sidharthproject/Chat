import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";




const initialState  ={
    user:{},
    chatId: 'null'
    
}
const chatSlice = createSlice({

    name:"chat",
    initialState,
    reducers:{
        chat:(state,action) => {
            state.chatId = action.payload.chatId
            state.user = action.payload.user
        },
        clearChat:(state)=>{
         state.user=null
         state.chatId =null
        }
       
  
    }            
    }
)

      
export const {chat,clearChat} = chatSlice.actions;

export default  chatSlice.reducer;