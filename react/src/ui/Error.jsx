import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";

import { requestHandlingActions } from "../store/request-handling";

const Error = (props) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.requestHandle.error);
  const title = useSelector((state) => state.requestHandle.title);
  const message = useSelector((state) => state.requestHandle.message);

  const viewedHandler = () => {
    dispatch(requestHandlingActions.unSetError());
  };

  return (
    <Card sx={{ width: "40%", backgroundColor: "#dfe7fd" }}>
      <CardHeader title={error} />
      <CardContent>{message}</CardContent>
      <CardActions>
        <Button onClick={viewedHandler}>Okay</Button>
      </CardActions>
    </Card>
  );
};

export default Error;
