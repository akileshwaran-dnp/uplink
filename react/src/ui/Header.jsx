import React, { Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/user-slice";
import { signOutActions } from "../store/auth-actions";

import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import CellTowerRoundedIcon from "@mui/icons-material/CellTowerRounded";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";

const Header = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isSignedIn);
  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(signOutActions(token));
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

  return (
    <Fragment>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CellTowerRoundedIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
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
            {token && (
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
            {token && (
              <Box
                sx={{
                  display: "flex",
                  justifySelf: "flex-end",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Button
                  sx={{ color: "white" }}
                  endIcon={<FaceTwoToneIcon />}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
                <Typography
                  variant="overline"
                  gutterBottom
                  sx={{ fontSize: "8px" }}
                >
                  @ {username}
                </Typography>
              </Box>
            )}
            {!token && (
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
