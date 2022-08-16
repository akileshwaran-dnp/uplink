import React from "react";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";

import { initialState, AuthReducer } from "../reducers/auth-reducers";
import { signInActions } from "../store/auth-actions";
import getCurrTime from "../functions/currentDataTime";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const dispatch = useDispatch();

  const [togglePass, setTogglePass] = useState(false);

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

  const signInHandler = () => {
    let currDT = getCurrTime();
    const res = dispatch(
      signInActions({
        username: form.username,
        password: form.password,
      })
    );
  };

  return (
    <Box sx={{ width: "40%", p: 2 }}>
      <Card variant="oulined" sx={{ p: 2 }}>
        <CardHeader title="Sign In" />
        <CardContent
          sx={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            label="Username/ Email"
            required
            error={form.isUsernameValid === false}
            helperText={
              form.isUsernameValid === false ? "min 6 characters" : ""
            }
            onChange={unameChangeHandler}
            sx={{ my: 2 }}
          />
          <TextField
            type={!togglePass ? "password" : "text"}
            label="Password"
            required
            error={form.isPasswordValid === false}
            onChange={passChangeHandler}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setTogglePass((prev) => !prev)}>
                  {togglePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            }}
            helperText={
              form.isPasswordValid === false
                ? "atleast 1 UPPER, lower, special case and number"
                : ""
            }
            sx={{ my: 2 }}
          />
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
