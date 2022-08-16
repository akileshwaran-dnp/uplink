import { VisibilityOff } from "@mui/icons-material";
import { Button, Card, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { initialState, AuthReducer } from "../reducers/auth-reducers";

const SignUp = () => {
  const [togglePassOne, setTogglePassOne] = useState(false);
  const [togglePassTwo, setTogglePassTwo] = useState(false);

  const [form, dispathForm] = useReducer(AuthReducer, initialState);

  const unameChangeHandler = (event) => {
    dispathForm({
      type: "UNAME_CHANGE",
      payload: event.target.value,
    });
  };

  const passChangeHandler = (event) => {
    dispathForm({
      type: "PASS_CHANGE",
      payload: event.target.value,
    });
  };

  const signUpHandler = () => {
    let currDT = getCurrTime();
    const res = dispatch(
      signinActions({
        username: form.username,
        password: form.password,
        login_dt: currDT,
      })
    );
    console.log(res);
  };
  return (
    <Card>
      <TextField label="Username" type="text" required />
      <TextField
        label="Password"
        type={togglePassOne ? "password" : "text"}
        required
        onChange={unameChangeHandler}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setTogglePassOne((prev) => !prev)}>
              {togglePassOne ? <VisibilityOff /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={togglePassTwo ? "password" : "text"}
        required
        onChange={passChangeHandler}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setTogglePassTwo((prev) => !prev)}>
              {togglePassTwo ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <TextField label="Email" type="email" />
      <TextField label="Firstname" type="text" />
      <TextField label="Lastname" type="text" />
      <Button>SignUp</Button>
    </Card>
  );
};

export default SignUp;
