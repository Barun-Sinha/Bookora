import { createSlice } from "@reduxjs/toolkit";


const allBookslice = createSlice({
  name: "allBooks",
  initialState: [], 
  reducers: {
    // replace entire list
    setAllBooks: (state, action) => {
      return action.payload;
    },  
}   
    },);    

export const { setAllBooks } = allBookslice.actions;
export default allBookslice.reducer;
