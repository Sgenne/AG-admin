import { configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from "./authSlice";

export interface StoreState {
  auth: IAuthState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
