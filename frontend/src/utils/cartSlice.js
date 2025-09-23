import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
    reducers: {
        addCart: (state, action) => {
            state.push(action.payload);
        },
        removeCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id); 
        },
        clearCart: (state, action) => {
            return [];
        }
    }
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;