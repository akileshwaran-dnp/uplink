import axios from "axios";

import { userActions } from "./user-slice";
import { requestHandlingActions } from "./request-handling";

export const signInActions = (userData) => {
  return async (dispatch) => {
    dispatch(requestHandlingActions.requestPending());

    axios
      .post("http://localhost:8000/auth/signin", {
        username: userData.username,
        password: userData.password,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        const username = res.data.username;
        dispatch(userActions.signin({ token, username }));
      })
      .catch((err) => {
        let error = err.response.data.error;
        if (error === "INVALID_USERNAME") {
          dispatch(
            requestHandlingActions.setError({
              title: "LOGIN",
              error: "invalid username",
              message:
                "Username does not exists. Please signup if you are a new user",
            })
          );
        }
        if (error === "INCORRECT_PASSWORD") {
          dispatch(
            requestHandlingActions.setError({
              title: "LOGIN",
              error: "incorrect password",
              message:
                "Username and password does not match. Please check the entered credentials",
            })
          );
        }
      });

    dispatch(requestHandlingActions.responseReceived());
  };
};

export const signOutActions = (token) => {
  return async (dispatch) => {
    dispatch(requestHandlingActions.requestPending());

    axios
      .post(
        "http://localhost:8000/auth/signout",
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        console.log(res);
        dispatch(userActions.signout());
      })
      .catch((err) => console.log(err));

    dispatch(requestHandlingActions.responseReceived());
  };
};
