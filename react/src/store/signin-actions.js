import { userActions } from "./user-slice";
import { requestHandlingActions } from "./request-handling";
import axios from "axios";

export const signinActions = (userData) => {
  return async (dispatch) => {
    dispatch(requestHandlingActions.requestPending());

    const response = await axios({
      method: "get",
      url: "http://localhost:8000/auth/signin",
      headers: {},
      params: {
        username: userData.username,
        password: userData.password,
      },
    });

    const statusText = await response.statusText;
    const data = await response.data;
    dispatch(requestHandlingActions.responseReceived());

    if (!statusText == "OK") {
      alert("server error");
      return;
    }

    switch (data) {
      case "VALID_CREDS":
        dispatch(userActions.signin(userData.username));
        break;

      case "INVALID_USERNAME":
        dispatch(
          requestHandlingActions.setError({
            title: "LOGIN",
            error: "invalid username",
            message: "username does not exists. please check your credentials",
          })
        );
        break;

      case "INCORRECT_PASSWORD":
        dispatch(
          requestHandlingActions.setError({
            title: "LOGIN",
            error: "incorrect password",
            message: "the username and password does not match",
          })
        );
        break;

      default:
        break;
    }
  };
};
