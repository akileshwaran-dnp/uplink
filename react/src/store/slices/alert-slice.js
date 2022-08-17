import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    setAlert(state, action) {
      state.alerts.push({
        alertType: action.payload.alertType,
        title: action.payload.title || "",
        message: action.payload.message,
      });
    },
    unSetAlert(state, action) {
      let alertIndex = action.payload.alertIndex;
      state.alerts.splice(alertIndex, 1);
    },
  },
});

export const alertActions = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
