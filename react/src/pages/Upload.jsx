import React, { Fragment } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  Container,
  IconButton,
  CardContent,
} from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { docsAsyncCreateAction } from "../store/actions/docs-action";

const oriStyle = { p: 2, backgroundColor: "#0091ea" };
const successStyle = { p: 2, backgroundColor: "#4caf50" };

const Upload = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const [docs, setDocs] = useState(null);
  const [isFile, setIsFile] = useState(false);

  const fileUploadHandler = (event) => {
    setDocs(event.target.files[0]);
  };

  const filesSubmitHandler = async (event) => {
    event.preventDefault();

    dispatch(docsAsyncCreateAction({ docs: docs, token: token }));
    document.getElementById("upload-input").value = null;
  };

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
          <input type="file" id="upload-input" onChange={fileUploadHandler} />
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
