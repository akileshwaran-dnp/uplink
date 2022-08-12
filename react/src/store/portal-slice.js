import { createSlice } from "@reduxjs/toolkit";

const portalSlice = createSlice({
  name: "portal",
  initialState: {
    totalCount: null,
    typeWise: [],
    userWise: [],
  },
  reducers: {
    setPortalDetails(state, action) {
      state.totalCount = action.payload.totalCount;
      state.typeWise = action.payload.typeWiseStats;
      state.userWise = action.payload.userWiseStats;
    },
  },
});

export const portalActions = portalSlice.actions;

export default portalSlice.reducer;
