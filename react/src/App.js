import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import SignIn from "./pages/SignIn";

import Home from "./pages/Home";
import PortalDetails from "./pages/PortalDetails";
import Header from "./ui/Header";
import History from "./pages/History";
import Error from "./pages/Error";

import { userActions } from "./store/user-slice";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isSignedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.checkIfSignedIn());
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Header>
      <main>
        <Routes>
          <Route path="/" element={<PortalDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Error />} />
          <Route
            path="/history"
            element={isLoggedIn ? <History /> : <Error />}
          />
        </Routes>
      </main>
    </Header>
  );
};

export default App;
