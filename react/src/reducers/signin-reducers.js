export const initialState = {
  username: "",
  isUsernameValid: null,
  password: "",
  isPasswordValid: null,
  isFormValid: false,
};

export const signInReducer = (state = initialState, action) => {
  if (action.type === "UNAME_CHANGE") {
    const usernameRegex = /^[a-z]{4,}$/;
    let uv = action.payload.includes("@") || usernameRegex.test(action.payload);

    return {
      username: action.payload,
      password: state.password,
      isUsernameValid: uv,
      isPasswordValid: state.isPasswordValid,
      isFormValid: state.isPasswordValid && uv,
    };
  }

  if (action.type === "PASS_CHANGE") {
    let pv = state.isUsernameValid && action.payload.length > 4;
    return {
      username: state.username,
      password: action.payload,
      isUsernameValid: state.isUsernameValid,
      isPasswordValid: pv,
      isFormValid: state.isUsernameValid && pv,
    };
  }

  return state;
};
