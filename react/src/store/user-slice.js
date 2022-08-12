import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", isSignedIn: false };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signin(state, action) {
      state.isSignedIn = true;
      state.username = action.payload;
      localStorage.setItem("isSignedIn", "yes");
      localStorage.setItem("username", action.payload);
    },

    signout(state) {
      state.isSignedIn = false;
      state.username = "";
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("username");
    },

    checkIfSignedIn(state) {
      if (
        localStorage.getItem("isSignedIn") &&
        localStorage.getItem("isSignedIn") === "yes"
      ) {
        state.isSignedIn = "yes";
        state.username = localStorage.getItem("username");
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
