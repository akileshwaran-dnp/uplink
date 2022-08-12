import axios from "axios";

export const docsActions = (id) => {
  return async (dispatch) => {
    axios({
      method: "get",
      url: "http://localhost:8000/files/save",
      responseType: "blob",
      params: {
        fileUploadID: id,
      },
    }).then((response) => {
      const blobURL = window.URL.createObjectURL(response.data);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
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
    });
  };
};
