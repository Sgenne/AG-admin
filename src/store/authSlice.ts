import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SIGN_IN_URL = "http://localhost:8080/auth/sign-in";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const body = JSON.stringify({
      email: email,
      password: password,
    });

    let response: Response;
    try {
      response = await fetch(SIGN_IN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
    } catch (err) {
      console.log(err);
      return {
        isSignedIn: false,
      };
    }

    // if user was succesfully logged in
    if (response.status === 200) {
      const data = await response.json();

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

    // if sign in failed for some other reason
    return {
      isSignedIn: false,
    };
  }
);

export interface IAuthState {
  isSignedIn: boolean;
  accessToken: string;
  email: string;
  password: string;
  invalidEmailOrPassword: boolean;
}

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
  reducers: {},
  extraReducers: (builder) => {
    // executed when signIn middleware has finished
    builder.addCase(signIn.fulfilled, (state, action) => {
      const payload = action.payload;

      console.log("payload: ", payload);

      return {
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
