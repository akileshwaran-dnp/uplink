import { createSlice } from "@reduxjs/toolkit";

const statisticsSlice = createSlice({
  name: "portal",
  initialState: {
    totalCount: 0,
    typeWise: [],
    userWise: [],
  },
  reducers: {
    setStatistics(state, action) {
      state.totalCount = action.payload.totalCount;
      state.typeWise = action.payload.typeWiseStats;
      state.userWise = action.payload.userWiseStats;
    },
  },
});

export const statisticsActions = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;
