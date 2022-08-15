import React, { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import getCurrTime from "../functions/currentDataTime";

import {
  Card,
  CardHeader,
  Container,
  IconButton,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {} from "@mui/icons-material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";

const oriStyle = { p: 2, backgroundColor: "#0091ea" };
const successStyle = { p: 2, backgroundColor: "#4caf50" };

const Upload = () => {
  const username = useSelector((state) => state.user.username);

  const [docs, setDocs] = useState(null);
  const [isFile, setIsFile] = useState(false);

  const fileUploadHandler = (event) => {
    setDocs(event.target.files[0]);
  };

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

    const data = await response.data;

    if (data == "UPLOAD_FAILURE") {
      alert("upload failure");
    } else {
      alert("File Uploaded Successfully at " + data);
    }
  };

  // return (
  //   <Fragment>
  //     <form onSubmit={filesSubmitHandler}>
  //       <input type="file" onChange={fileUploadHandler} />
  //       <input type="submit" value="Upload files" />
  //     </form>
  //   </Fragment>
  // );

  return (
    <Card
      sx={{
        p: 3,
        minWidth: "30%",
      }}
    >
      <CardHeader title="Uplink files" />
      <CardContent>
        <Card sx={isFile ? successStyle : oriStyle}>
          <input type="file" onChange={fileUploadHandler} />
          <IconButton
            sx={{ "&:hover": { background: "none" }, color: "white" }}
            onClick={filesSubmitHandler}
          >
            <NoteAddRoundedIcon sx={{ color: "#cddc39" }} />
          </IconButton>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Upload;
