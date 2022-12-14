import axios from "axios";
import { statisticsActions } from "../slices/statistics-slice";

export const statisticsAsyncAction = () => {
  return async (dispatch) => {
    const getData = async () => {
      const totalRes = await axios({
        method: "get",
        url: "http://localhost:8000/stats/total",
      });
      const typeRes = await axios({
        method: "get",
        url: "http://localhost:8000/stats/type",
      });
      const userRes = await axios({
        method: "get",
        url: "http://localhost:8000/stats/user",
      });
      const statsData = {
        totalCount: totalRes.data,
        typeWiseStats: typeRes.data,
        userWiseStats: userRes.data,
      };
      return statsData;
    };
    const statsData = await getData();
    dispatch(statisticsActions.setStatistics(statsData));
  };
};
