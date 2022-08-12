import React, { Fragment } from "react";
import { statsActions } from "../store/stats-actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Bar from "../ui/Bar";
import Counter from "../ui/Counter";
import Loading from "../ui/Loading";

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
        <div key={data.filetype}>
          {data.filetype} {data.count}
        </div>
      );
    });
    return typeWise;
  }

  function renderUserWise() {
    if (!userWiseStats) return "no data";
    const userWise = [];
    userWiseStats.map((data) => {
      userWise.push(
        <div key={data.username}>
          {data.username} {data.count} <Bar height={data.count} />
        </div>
      );
    });
    return userWise;
  }

  return (
    <Fragment>
      <h2>
        Files Uplinked:{" "}
        <Counter start={"0"} end={totalCount ? totalCount.toString() : "0"} />
      </h2>
      <div>{renderTypeWise()}</div>
      {renderUserWise()}
      {/* <Loading /> */}
    </Fragment>
  );
};

export default PortalDetails;
