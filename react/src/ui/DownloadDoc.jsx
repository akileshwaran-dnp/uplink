import React from "react";
import { useDispatch } from "react-redux";
import { docsActions } from "../store/docs-action";
import classes from "../styles/DownloadDoc.module.css";

const DownloadDoc = (props) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(docsActions(props.id));
  };

  return (
    <td onClick={onClickHandler} className={classes.filename}>
      {props.children}
    </td>
  );
};

export default DownloadDoc;
