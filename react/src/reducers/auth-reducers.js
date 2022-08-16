export const initialState = {
  username: "",
  isUsernameValid: null,
  password: "",
  isPasswordValid: null,
  isFormValid: false,
};

export const AuthReducer = (state = initialState, action) => {
  if (action.type === "UNAME_CHANGE") {
    const usernameRegex = /^[a-z]{6,}$/;
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
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z_\d@$!%*?&]{6,}$/;
    let pv = state.isUsernameValid && passRegex.test(action.payload);
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
