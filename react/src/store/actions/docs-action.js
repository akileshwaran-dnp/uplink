import axios from "axios";
import { alertActions } from "../slices/alert-slice";
import { docsActions } from "../slices/docs-slice";

export const docsAsyncSaveAction = (payload) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8000/docs/${payload.id}`, {
        responseType: "blob",
        headers: { Authorization: `Token ${payload.token}` },
      })
      .then((response) => {
        const blobURL = window.URL.createObjectURL(response.data);
        const tempLink = document.createElement("a");
        tempLink.href = blobURL;
        let filename =
          response.headers["content-disposition"].split("filename= ")[1];
        tempLink.setAttribute("download", filename);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      })
      .catch((err) => {
        dispatch(
          alertActions.setAlert({
            alertType: "error",
            title: "File not found",
            message: "The respective file is not present in the server",
          })
        );
      });
  };
};

export const docsAsyncCreateAction = (payload) => {
  return (dispatch) => {
    let formData = new FormData();
    let dt = new Date();
    let utc = dt.toISOString();
    formData.append("uploadedFiles", payload.docs);
    formData.append("uploadDT", utc);

    axios
      .post("http://localhost:8000/docs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${payload.token}`,
        },
      })
      .then((res) => {
        let upTime = Date(res.data.uploadDT + " UTC").toLocaleString();
        dispatch(
          alertActions.setAlert({
            alertType: "success",
            title: "Upload success",
            message: `File Uploaded successfully at ${upTime}`,
          })
        );
      });
  };
};

export const docsAsyncListAction = (payload) => {
  return async (dispatch) => {
    axios
      .get("http://localhost:8000/docs/", {
        headers: { Authorization: `Token ${payload.token}` },
      })
      .then((res) => {
        dispatch(docsActions.setHistory(res.data.docs_history));
      })
      .catch((err) => console.log(err));
  };
};
