import React, { Fragment } from "react";
import { statsActions } from "../store/stats-actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Bar from "../ui/Bar";
import Counter from "../ui/Counter";
import Loading from "../ui/Loading";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";

const PortalDetails = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.portal.totalCount);
  const typeWiseStats = useSelector((state) => state.portal.typeWise);
  const userWiseStats = useSelector((state) => state.portal.userWise);

  useEffect(() => {
    dispatch(statsActions());
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
    <Fragment>
      {/* <h2>
        Files Uplinked:{" "}
        <Counter start={"0"} end={totalCount ? totalCount.toString() : "0"} />
      </h2> */}
      {/* <div>{renderTypeWise()}</div> */}
      <Card sx={{ width: "50%", my: 2 }}>
        <CardHeader title={"Files Uplinked: " + totalCount} />
      </Card>
      <Card sx={{ width: "50%", my: 2 }}>
        <CardHeader title="Typewise Files Uplinked" />
        {renderTypeWise()}
      </Card>
      <Card sx={{ width: "50%", my: 2 }}>
        <CardHeader title="Userwise Files Uplinked" />
        {renderUserWise()}
      </Card>
    </Fragment>
  );
};

export default PortalDetails;
