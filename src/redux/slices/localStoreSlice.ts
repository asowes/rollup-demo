import { createSlice } from "@reduxjs/toolkit";

export const localStoreSliceName = "store";
const localStoreSlice = createSlice({
  name: localStoreSliceName,
  initialState: {
    userId: 10001,
  },
  reducers: {
    updateUserId(state, action) {
      const { payload } = action;
      state.userId = payload;
    },
  },
});
export const { updateUserId } = localStoreSlice.actions;
export default localStoreSlice.reducer;
