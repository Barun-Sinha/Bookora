
import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    // replace entire list
    setAllUsers: (state, action) => {
      return action.payload;
    },

    // add one user
}
});

export const { setAllUsers } = allUserSlice.actions;
export default allUserSlice.reducer;
