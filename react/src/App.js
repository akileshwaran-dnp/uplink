import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import SignIn from "./pages/SignIn";

import PortalDetails from "./pages/PortalDetails";
import Header from "./ui/Header";
import History from "./pages/History";
import Error from "./ui/Error";
import Loading from "./ui/Loading";

import { userActions } from "./store/user-slice";
import Upload from "./pages/Upload";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isSignedIn);
  const error = useSelector((state) => state.requestHandle.error);
  const isLoading = useSelector((state) => state.requestHandle.isLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.checkIfSignedIn());
    if (isLoggedIn) {
      navigate("/history");
    }
  }, [isLoggedIn]);

  return (
    <Header>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<PortalDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/upload" element={isLoggedIn ? <Upload /> : <Error />} />
        <Route path="/history" element={isLoggedIn ? <History /> : <Error />} />
      </Routes>
      {error && <Error />}
    </Header>
  );
};

export default App;
