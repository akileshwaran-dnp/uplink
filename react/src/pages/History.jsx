import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { historyActions } from "../store/history-actions";
import { docsActions } from "../store/docs-action";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
} from "@mui/material";

const History = () => {
  const dispatch = useDispatch();

  const files = useSelector((state) => state.history.files);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    dispatch(historyActions({ username: username }));
  }, []);

  const onDownloadHandler = (id) => {
    dispatch(docsActions(id));
  };

  return (
    <Card sx={{ minWidth: "60%", my: 3, p: 3 }}>
      {files.length !== 0 ? (
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
              {files.map((file, index) => (
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
                  <TableCell align="left">{file.uploadDT}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "No data found...Please upload some files"
      )}
    </Card>
  );
};

export default History;
