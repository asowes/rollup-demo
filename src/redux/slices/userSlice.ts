import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  address: string;
  deposit: number;
}

const initialState: UserState = {
  id: "10001",
  name: "asow",
  address: "shenzhen",
  deposit: 20000,
};

export const userSliceName = "user";
const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    updateAddress(state, action: PayloadAction<string>) {
      const { payload } = action;
      state.address = payload;
    },
    changeDeposit(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.deposit = payload;
    },
  },
});

export const { updateAddress, changeDeposit } = userSlice.actions;
export default userSlice.reducer;
