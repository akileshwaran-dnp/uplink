import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", isAuthenticated: false, token: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signout(state) {
      state.isAuthenticated = false;
      state.username = "";
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },

    signin(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },

    checkIfAuthenticated(state) {
      if (localStorage.getItem("token")) {
        state.isAuthenticated = true;
        state.username = localStorage.getItem("username");
        state.token = localStorage.getItem("token");
      }
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
