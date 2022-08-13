import { createSlice } from "@reduxjs/toolkit";

const requestHandlingSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    error: null,
    message: "",
    title: "",
  },
  reducers: {
    requestPending(state) {
      state.isLoading = true;
    },
    responseReceived(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload.error;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    unSetError(state) {
      state.error = null;
      state.title = "";
      state.message = "";
    },
  },
});

export const requestHandlingActions = requestHandlingSlice.actions;

export default requestHandlingSlice.reducer;
