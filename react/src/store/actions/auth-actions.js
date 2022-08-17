import axios from "axios";

import { userActions } from "../slices/user-slice";
import { alertActions } from "../slices/alert-slice";

export const signInAsyncAction = (userData) => {
  return async (dispatch) => {
    axios
      .post("http://localhost:8000/auth/signin", {
        username: userData.username,
        password: userData.password,
      })
      .then((res) => {
        const token = res.data.token;
        const username = res.data.username;
        dispatch(userActions.signin({ token, username }));
        dispatch(
          alertActions.setAlert({
            actionType: "success",
            title: "",
            message: "Login sucessful !",
          })
        );
      })
      .catch((err) => {
        let error = err.response.data.error;
        if (error === "INVALID_USERNAME") {
          dispatch(
            alertActions.setAlert({
              alertType: "error",
              title: "Invalid Username",
              message:
                "Username does not exists. Please signup if you are a new user",
            })
          );
        }
        if (error === "INCORRECT_PASSWORD") {
          dispatch(
            alertActions.setAlert({
              alertType: "error",
              title: "Incorrect Password",
              message:
                "Username and password does not match. Please check the entered credentials",
            })
          );
        }
      });
  };
};

export const signOutAsyncAction = (token) => {
  return async (dispatch) => {
    axios
      .post(
        "http://localhost:8000/auth/signout",
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        dispatch(userActions.signout());
      })
      .catch((err) => console.log(err));

    dispatch(
      alertActions.setAlert({
        alertType: "success",
        message: "Thank You! logged out successfully",
      })
    );
  };
};
