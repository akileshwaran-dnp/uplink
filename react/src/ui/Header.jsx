import React, { Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/user-slice";
import classes from "../styles/Header.module.css";

import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import CellTowerRoundedIcon from "@mui/icons-material/CellTowerRounded";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import BoyRoundedIcon from "@mui/icons-material/BoyRounded";

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
  };

  const activeStyle = {
    textDecoration: "none",
    color: "#FDCA40",
  };

  // return (
  //   <Fragment>
  //     <header className={classes.header}>
  //       <nav>
  //         <ul>
  //           <span className={classes.logo}>
  //             <NavLink
  //               style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
  //               to="/"
  //             >
  //               Uplink
  //             </NavLink>
  //           </span>
  //           <li>
  //             {!isLoggedIn && (
  //               <NavLink
  //                 to="/signin"
  //                 style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
  //               >
  //                 <span className="material-symbols-rounded">man_2</span>
  //                 <h4>Login</h4>
  //               </NavLink>
  //             )}
  //             {isLoggedIn && (
  //               <NavLink
  //                 to="/upload"
  //                 style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
  //               >
  //                 <span className="material-symbols-rounded">history</span>
  //                 <h4>Upload</h4>
  //               </NavLink>
  //             )}
  //             {isLoggedIn && (
  //               <NavLink
  //                 to="/history"
  //                 style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
  //               >
  //                 <span className="material-symbols-rounded">history</span>
  //                 <h4>History</h4>
  //               </NavLink>
  //             )}
  //             {isLoggedIn && (
  //               <div style={linkStyle} onClick={logoutHandler}>
  //                 <span className="material-symbols-rounded">logout</span>
  //                 <h4>Logout</h4>
  //               </div>
  //             )}
  //             {isLoggedIn && (
  //               <div style={linkStyle}>
  //                 <span className="material-symbols-rounded">
  //                   familiar_face_and_zone
  //                 </span>
  //                 <h5>{username}</h5>
  //               </div>
  //             )}
  //           </li>
  //         </ul>
  //       </nav>
  //     </header>
  //     {props.children}
  //   </Fragment>
  // );

  return (
    <Fragment>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CellTowerRoundedIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
              >
                UPLINK
              </NavLink>
            </Typography>
            {isLoggedIn && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: { md: "flex" },
                }}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  <NavLink
                    to="/history"
                    style={({ isActive }) =>
                      isActive ? activeStyle : linkStyle
                    }
                  >
                    History
                  </NavLink>
                </Button>

                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  <NavLink
                    to="/upload"
                    style={({ isActive }) =>
                      isActive ? activeStyle : linkStyle
                    }
                  >
                    Upload
                  </NavLink>
                </Button>
              </Box>
            )}
            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  sx={{ color: "white" }}
                  endIcon={<FaceTwoToneIcon />}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </Box>
            )}
            {!isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  <NavLink
                    to="/signin"
                    style={({ isActive }) =>
                      isActive ? activeStyle : linkStyle
                    }
                  >
                    Login
                  </NavLink>
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        {props.children}
      </Grid>
    </Fragment>
  );
};

export default Header;
