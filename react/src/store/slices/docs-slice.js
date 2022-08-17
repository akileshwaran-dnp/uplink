import { createSlice } from "@reduxjs/toolkit";

const docsSlice = createSlice({
  name: "history",
  initialState: {
    files: [],
  },
  reducers: {
    setHistory(state, action) {
      state.files = [];
      action.payload.forEach((file) => {
        state.files.push({
          fileUploadID: file.fileUploadID,
          filename: file.filename,
          filetype: file.filetype,
          uploadDT: file.uploadDT,
        });
      });
    },
  },
});

export const docsActions = docsSlice.actions;

export const docsReducer = docsSlice.reducer;
