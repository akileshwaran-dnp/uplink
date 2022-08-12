import React, { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const username = useSelector((state) => state.user.username);

  const [docs, setDocs] = useState(null);

  const fileUploadHandler = (event) => {
    setDocs(event.target.files[0]);
  };

  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }

  function getCurrTime() {
    var currTime = new Date();

    let standFormDT =
      currTime.getFullYear() +
      "-" +
      pad2(currTime.getMonth()) +
      "-" +
      pad2(
        currTime.getDate() +
          " " +
          pad2(currTime.getHours()) +
          ":" +
          pad2(currTime.getMinutes()) +
          ":" +
          pad2(currTime.getSeconds())
      );
    return standFormDT;
  }

  const filesSubmitHandler = async (event) => {
    event.preventDefault();
    let dt = getCurrTime();

    let formData = new FormData();
    formData.append("uploadedFiles", docs);
    formData.append("username", username);
    formData.append("uploadDT", dt);

    const response = await axios({
      method: "post",
      url: "http://localhost:8000/files/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);
  };

  return (
    <Fragment>
      <form onSubmit={filesSubmitHandler}>
        <input type="file" onChange={fileUploadHandler} />
        <input type="submit" value="Upload files" />
      </form>
    </Fragment>
  );
};

export default Home;
