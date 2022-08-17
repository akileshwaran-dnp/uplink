import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  docsAsyncSaveAction,
  docsAsyncListAction,
} from "../store/actions/docs-action";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
  Box,
} from "@mui/material";

const History = () => {
  const dispatch = useDispatch();

  const docs = useSelector((state) => state.docs.files);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(docsAsyncListAction({ token: token }));
  }, []);

  const onDownloadHandler = (id) => {
    dispatch(docsAsyncSaveAction({ id: id, token: token }));
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: "60%", my: 3, p: 3 }}>
        {docs.length !== 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">S.No</TableCell>
                  <TableCell align="left">Filename</TableCell>
                  <TableCell align="left">Filetype</TableCell>
                  <TableCell align="left">Upload Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {docs.map((file, index) => (
                  <TableRow
                    key={file.fileUploadID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => onDownloadHandler(file.fileUploadID)}
                        sx={{
                          textTransform: "none",
                          p: 0,
                          "&:hover": {
                            background: "none",
                            textDecorationLine: "underline",
                          },
                        }}
                      >
                        {file.filename}
                      </Button>
                    </TableCell>
                    <TableCell align="left">.{file.filetype}</TableCell>
                    <TableCell align="left">
                      {new Date(file.uploadDT + " UTC").toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          "No data found...Please upload some docs"
        )}
      </Card>
    </Box>
  );
};

export default History;
