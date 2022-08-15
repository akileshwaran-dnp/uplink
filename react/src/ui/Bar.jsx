import React from "react";
import { styled } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { Box, Typography } from "@mui/material";

const colorMatches = [
  {
    colorPrimary: "#95d5b2",
    colorBar: "#1b4332",
    label: "#52796f",
    labelValue: "#283618",
  },
  {
    colorPrimary: "#cce3de",
    colorBar: "#023e8a",
    label: "#949c81",
    labelValue: "#283618",
  },
];

const Bar = (props) => {
  let currTheme = {};
  if (props.variant == 0) {
    currTheme = colorMatches[0];
  } else {
    currTheme = colorMatches[1];
  }
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: `${currTheme.colorPrimary}`,
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: `${currTheme.colorBar}`,
    },
  }));

  return (
    <Box sx={{ mx: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="overline" sx={{ color: `${currTheme.label}` }}>
          {props.variant == 0 ? "." : "@"} {props.username}
        </Typography>
        <Typography variant="button" sx={{ color: `${currTheme.labelValue}` }}>
          # {props.count}
        </Typography>
      </Box>
      <BorderLinearProgress value={props.fill} variant="determinate" />
    </Box>
  );
};

export default Bar;
