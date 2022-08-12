import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
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

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
