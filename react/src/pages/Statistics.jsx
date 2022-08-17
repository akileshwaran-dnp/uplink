import React from "react";
import { statisticsAsyncAction } from "../store/actions/statistics-actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Bar from "../ui/Bar";
import Counter from "../ui/Counter";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";

const Statistics = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.statistics.totalCount);
  const typeWiseStats = useSelector((state) => state.statistics.typeWise);
  const userWiseStats = useSelector((state) => state.statistics.userWise);

  useEffect(() => {
    dispatch(statisticsAsyncAction());
  }, []);

  function renderTypeWise() {
    if (!typeWiseStats) return "no data";
    const typeWise = [];
    typeWiseStats.map((data) => {
      typeWise.push(
        <CardContent key={data.filetype}>
          <Bar
            username={data.filetype}
            count={data.count}
            fill={(data.count / totalCount) * 100}
            variant={0}
          />
        </CardContent>
      );
    });
    return typeWise;
  }

  function renderUserWise() {
    if (!userWiseStats) return "no data";
    const userWise = [];
    userWiseStats.map((data) => {
      userWise.push(
        <CardContent key={data.username}>
          <Bar
            username={data.username}
            count={data.count}
            fill={(data.count / totalCount) * 100}
            variant={1}
          />
        </CardContent>
      );
    });
    return userWise;
  }

  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "50%", my: 2 }}>
        <CardContent>
          Files Uplink: <Counter start="0" end={String(totalCount)} />
        </CardContent>
      </Card>
      <Card sx={{ width: "50%", my: 2 }}>
        <CardHeader title="Typewise Files Uplinked" />
        {renderTypeWise()}
      </Card>
      <Card sx={{ width: "50%", my: 2 }}>
        <CardHeader title="Userwise Files Uplinked" />
        {renderUserWise()}
      </Card>
    </Box>
  );
};

export default Statistics;
