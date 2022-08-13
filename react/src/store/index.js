import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import filesReducer from "./files-slice";
import portalReducer from "./portal-slice";
import requestReducer from "./request-handling";

const store = configureStore({
  reducer: {
    user: userReducer,
    history: filesReducer,
    portal: portalReducer,
    requestHandle: requestReducer,
  },
});

export default store;
