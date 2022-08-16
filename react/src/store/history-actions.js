import axios from "axios";
import { filesActions } from "./files-slice";

export const historyActions = (payload) => {
  return async (dispatch) => {
    axios
      .get("http://localhost:8000/docs/", {
        headers: { Authorization: `Token ${payload.token}` },
      })
      .then((res) => {
        // console.log(res);
        dispatch(filesActions.setHistory(res.data.docs_history));
      })
      .catch((err) => console.log(err));
  };
};
