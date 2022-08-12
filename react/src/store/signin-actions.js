import { userActions } from "./user-slice";
import axios from "axios";

// export const signinActions = (userData) => {
//   return async (dispatch) => {
//     const validateUser = async (userData) => {
//       const response = await fetch("http://localhost:8000/auth/signin", {
//         method: "GET",
//         'Content-Type': 'application/json',
//         body: JSON.stringify({
//           "username": userData.username,
//           "password": userData.password,
//         }),
//       });

//       console.log ( response )
//       const data = await response.json();
//       if (data.response === "valid") {
//         dispatch(userActions.signin(data.username));
//       }
//       console.log(data);
//       return data;
//     };
//     try {
//       await validateUser(userData);
//     } catch (error) {
//       return error;
//     }
//   };
// };

export const signinActions = (userData) => {
  return async (dispatch) => {
    const response = await axios({
      method: "get",
      url: "http://localhost:8000/auth/signin",
      headers: {},
      params: {
        username: userData.username,
        password: userData.password,
      },
    });

    const data = await response.data;
    if (data.validity === "valid") {
      dispatch(userActions.signin(data.username));
    }
  };
};
