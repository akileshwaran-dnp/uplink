import axios from "axios";
import { filesActions } from "./files-slice";

export const historyActions = (payload) => {
  return async (dispatch) => {
    const response = await axios({
      method: "get",
      url: "http://localhost:8000/files/history",
      params: { username: payload.username },
    });
    const data = response.data;
    dispatch(filesActions.setHistory(data));
  };
};
