import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Counter = (props) => {
  const startCount = props.start;
  const finalCount = props.end;

  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = parseInt(startCount.substring(0, 3));
    const end = parseInt(finalCount.substring(0, 3));
    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + finalCount.substring(3));
      if (start === end) clearInterval(timer);
    }, 10);
  }, [finalCount]);

  return <>{count}</>;
};

export default Counter;
