import axios from "axios";
import { requestHandlingActions } from "./request-handling";

export const docsActions = (payload) => {
  return async (dispatch) => {
    dispatch(requestHandlingActions.requestPending());

    const response = await axios({
      method: "get",
      url: `http://localhost:8000/docs/${payload.id}`,
      responseType: "blob",
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });

    dispatch(requestHandlingActions.responseReceived());

    // error
    const reqError = await response.data.text();
    if (reqError == '"failure"') {
      alert("server error");
      return;
    }

    const blobURL = window.URL.createObjectURL(response.data);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;

    // getting file name
    let filename =
      response.headers["content-disposition"].split("filename= ")[1];

    tempLink.setAttribute("download", filename);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  };
};
