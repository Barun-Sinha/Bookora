import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import allUsersReducer from "./allUserSlice";
import allBooksReducer from "./allBooksSlice";



const appStore = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    allUsers: allUsersReducer,
    allBooks: allBooksReducer,
    
  },
});

export default appStore;