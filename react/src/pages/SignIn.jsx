import React from "react";
import { useReducer } from "react";
import { useDispatch } from "react-redux";

import { initialState, signInReducer } from "../reducers/signin-reducers";
import { signinActions } from "../store/signin-actions";

import classes from "../styles/SignIn.module.css";

const SignIn = () => {
  const dispatch = useDispatch();

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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      signinActions({ username: form.username, password: form.password })
    );
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.signInForm}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        onChange={unameChangeHandler}
        id="username"
        className={classes.signInInput}
      />
      <label htmlFor="password">Passcode</label>
      <input
        type="password"
        onChange={passChangeHandler}
        id="password"
        className={classes.signInInput}
      />
      <input type="submit" className={classes.signInSubmit} />
    </form>
  );
};

export default SignIn;
