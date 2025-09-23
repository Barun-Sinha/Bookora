import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  isAuthenticated:false,
  loading:false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { login, logout , setLoading } = userSlice.actions;
export default userSlice.reducer;