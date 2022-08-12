import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/user-slice";
import classes from "../styles/Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isSignedIn);
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userActions.signout());
    navigate("/");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "1em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 1.5em",
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <nav>
          <ul>
            <span className={classes.logo}>Uplink</span>
            <li>
              {!isLoggedIn && (
                <Link to="/signin" style={linkStyle}>
                  <span className="material-symbols-rounded">man_2</span>
                  <h4>Login</h4>
                </Link>
              )}
              {isLoggedIn && (
                <Link to="/history" style={linkStyle}>
                  <span className="material-symbols-rounded">history</span>
                  <h4>History</h4>
                </Link>
              )}
              {isLoggedIn && (
                <div style={linkStyle} onClick={logoutHandler}>
                  <span className="material-symbols-rounded">logout</span>
                  <h4>Logout</h4>
                </div>
              )}
              {isLoggedIn && (
                <div style={linkStyle}>
                  <span className="material-symbols-rounded">
                    familiar_face_and_zone
                  </span>
                  <h5>{username}</h5>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {props.children}
    </Fragment>
  );
};

export default Header;
