import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SIGN_IN_URL = "http://localhost:8080/auth/sign-in";

const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const body = JSON.stringify({
      email: email,
      password: password,
    });

    const response = await fetch(SIGN_IN_URL, {
      method: "POST",
      body: body,
    });

    // if user was succesfully logged in
    if (response.status === 200) {
      const data = JSON.parse(await response.json());

      return {
        isSignedIn: true,
        accessToken: data.accessToken,
        email: email,
        password: password,
      };
    }
    // if sign in failed due to incorrect email or password
    else if (response.status === 400) {
      return {
        isSignedIn: false,
        invalidEmailOrPassword: true,
      };
    }

    // if sign in failed due to some other reason
    return {
      isSignedIn: false,
    };
  }
);

const _initialState = {
  isSignedIn: false,
  accessToken: "",
  email: "",
  password: "",
  invalidEmailOrPassword: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: _initialState,
  reducers: {
    signOut: (state, action) => {
      return _initialState;
    },
  },
  extraReducers: (builder) => {

    // executed when signIn middleware has finished
    builder.addCase(signIn.fulfilled, (state, action) => {
      const payload = action.payload;

      state = {
        ...state,
        isSignedIn: payload.isSignedIn,
        accessToken: payload.accessToken,
        email: payload.email || "",
        password: payload.password || "",
        invalidEmailOrPassword: payload.invalidEmailOrPassword || false,
      };
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
