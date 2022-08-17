import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import SignIn from "./pages/SignIn";

import Statistics from "./pages/Statistics";
import Header from "./ui/Header";
import History from "./pages/History";

import { userActions } from "./store/slices/user-slice";
import Upload from "./pages/Upload";
import CustomAlert from "./ui/CustomeAlert";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.checkIfAuthenticated());
    if (isLoggedIn) {
      navigate("/history");
    }
  }, [isLoggedIn]);

  return (
    <Header>
      <CustomAlert />
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route
          path="/signin"
          element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={isLoggedIn ? <Upload /> : <Navigate to="/" />}
        />
        <Route
          path="/history"
          element={isLoggedIn ? <History /> : <Navigate to="/" />}
        />
      </Routes>
    </Header>
  );
};

export default App;
