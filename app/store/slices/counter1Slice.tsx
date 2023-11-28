import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Counter1State = {
  counter: number;
  loading: boolean;
};

const initialValues: Counter1State = {
  counter: 0,
  loading: false,
};

export const setValuesAsync = createAsyncThunk(
  "counter1/setValuesAsync",
  async (values:number) => {
    return values;
  }
);

const counter1Slice = createSlice({
  name: "counter1",
  initialState: initialValues,
  reducers: {
    increase: (state: Counter1State, actions: PayloadAction<void>) => {
      state.counter = state.counter + 1;
    },
  }, // code ในส่วนการอัพเดต state
  extraReducers: (builder) => {
    builder.addCase(setValuesAsync.fulfilled,(state,action)=>{state.counter=action.payload})
    builder.addCase(setValuesAsync.rejected,(state,action)=>{state.counter=0})
    builder.addCase(setValuesAsync.pending,(state,action)=>{state.counter=0})
  },
});

export const { increase } = counter1Slice.actions;
export const counter1Selector = (store: RootState) => store.counter1Reducer;
export default counter1Slice.reducer;