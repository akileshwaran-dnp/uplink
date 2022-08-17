import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Alert, IconButton, AlertTitle, Box } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { alertActions } from "../store/slices/alert-slice";

const CustomAlert = () => {
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.alert.alerts);

  const closeAlert = (index) => {
    dispatch(alertActions.unSetAlert({ alertIndex: index }));
  };

  return (
    <Box>
      <Collapse in={alerts !== []}>
        {alerts.map((alert, index) => {
          return (
            <Alert
              key={index}
              // severity="error"
              severity={alert.alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    closeAlert(index);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.title !== "" && <AlertTitle>{alert.title}</AlertTitle>}
              {alert.message}
            </Alert>
          );
        })}
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
