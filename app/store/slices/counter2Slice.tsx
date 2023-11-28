import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const counter2Slice = createSlice({
    name:"counter2",
    initialState:{},
    reducers:{}, // code ในส่วนการอัพเดต state
    extraReducers:(builder)=>{

    }
})

export const {} = counter2Slice.actions;
export const counter2Selector = (store:RootState)=>store.counter2Reducer;
export default counter2Slice.reducer;