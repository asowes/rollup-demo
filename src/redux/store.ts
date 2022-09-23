import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import localStoreSlice from "./slices/localStoreSlice";

export const reducers = {
  user: userSlice,
  store: localStoreSlice,
};

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
