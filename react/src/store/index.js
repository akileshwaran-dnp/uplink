import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import filesReducer from "./files-slice";
import portalReducer from "./portal-slice";

const store = configureStore({
  reducer: { user: userReducer, history: filesReducer, portal: portalReducer },
});

export default store;
