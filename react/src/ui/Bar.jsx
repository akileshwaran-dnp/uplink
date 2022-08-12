import React from "react";

const Bar = (props) => {
  const styleProps = {
    width: `"${props.height}px"`,
    fill: "blue",
    transition: "1s ease-in",
    backgroundColor: "white",
    // border: "2px solid black",
    height: "5px",
  };

  return <div style={styleProps}>{props.children}</div>;
};

export default Bar;
