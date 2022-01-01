import { createSlice } from "@reduxjs/toolkit";

const _initialState = {
  signedIn: false,
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: _initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        signedIn: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },
    logout: (state, action) => {
      return _initialState;
    },
  },
});
