import React from "react";
import classes from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingImg}>
        <span className="material-symbols-rounded">rocket</span>
      </div>
    </div>
  );
};

export default Loading;
