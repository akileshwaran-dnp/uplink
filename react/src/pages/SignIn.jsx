import React from "react";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";

import { initialState, signInReducer } from "../reducers/signin-reducers";
import { signinActions } from "../store/signin-actions";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const dispatch = useDispatch();

  const [togglePass, setTogglePass] = useState(false);

  const [form, dispathForm] = useReducer(signInReducer, initialState);

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

  const signInHandler = () => {
    const res = dispatch(
      signinActions({ username: form.username, password: form.password })
    );
    console.log(res);
  };

  const toggleHandler = () => {
    console.log(togglePass);
    setTogglePass((prev) => {
      return !prev;
    });
  };

  return (
    <Box sx={{ minWidth: "30%" }}>
      <Card variant="oulined">
        <CardHeader title="Sign In" />
        <CardContent sx={{ flexDirection: "column", display: "flex" }}>
          <FormControl sx={{ my: 2 }}>
            <InputLabel
              htmlFor="signin-username"
              color={form.isUsernameValid ? "success" : "error"}
            >
              Username
            </InputLabel>
            <OutlinedInput
              id="signin-username"
              type="text"
              label="Username"
              color={form.isUsernameValid ? "success" : "error"}
              onChange={unameChangeHandler}
              required
            />
          </FormControl>
          <FormControl sx={{ my: 2 }}>
            <InputLabel
              htmlFor="signin-password"
              color={form.isPasswordValid ? "success" : "error"}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="sign-password"
              type={togglePass ? "text" : "password"}
              label="Password"
              color={form.isPasswordValid ? "success" : "error"}
              onChange={passChangeHandler}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleHandler}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {togglePass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            endIcon={<SendTwoToneIcon />}
            disabled={!form.isFormValid}
            onClick={signInHandler}
          >
            SIGNIN
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
