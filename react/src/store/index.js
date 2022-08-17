import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user-slice";
import { docsReducer } from "./slices/docs-slice";
import { statisticsReducer } from "./slices/statistics-slice";
import { alertReducer } from "./slices/alert-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    docs: docsReducer,
    statistics: statisticsReducer,
    alert: alertReducer,
  },
});

export default store;
