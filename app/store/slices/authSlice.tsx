import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const authSlice = createSlice({
    name:"authLogin",
    initialState:{user:null,token:null},
    reducers:{
        memberLogin:(state,action)=>{

        },
        memberLogout:(state,action)=>{
            state.user = null
            state.token = null
        }
    },
})


export const { memberLogin } = authSlice.actions;
export const counter1Selector = (store: RootState) => store.counter1Reducer;
export default authSlice.reducer;