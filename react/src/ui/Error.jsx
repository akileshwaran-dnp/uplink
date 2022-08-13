import React from "react";
import { useSelector, useDispatch } from "react-redux";

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
    <>
      <h3>{error}</h3>
      <p>{message}</p>
      <button onClick={viewedHandler}>Okay</button>
    </>
  );
};

export default Error;
