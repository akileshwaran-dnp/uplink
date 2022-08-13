import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { historyActions } from "../store/history-actions";
import DownloadDoc from "../ui/DownloadDoc";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
} from "@mui/material";

const History = () => {
  const dispatch = useDispatch();

  const files = useSelector((state) => state.history.files);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    dispatch(historyActions({ username: username }));
  }, []);

  function renderHistoryData() {
    const historyData = [];
    files.map((file, index) => {
      historyData.push(
        <tr key={file.fileUploadID}>
          <td>{index + 1}</td>
          <DownloadDoc id={file.fileUploadID}>{file.filename}</DownloadDoc>
          <td>.{file.filetype}</td>
          <td>{file.uploadDT}</td>
        </tr>
      );
    });
    return historyData;
  }

  // return (
  //   <>
  //     {files !== [] ? (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>S.No</th>
  //             <th>Filename</th>
  //             <th>Filetype</th>
  //             <th>Upload Data</th>
  //           </tr>
  //         </thead>
  //         <tbody>{renderHistoryData()}</tbody>
  //       </table>
  //     ) : (
  //       "no data found"
  //     )}
  //   </>
  // );

  return (
    <Card sx={{ minWidth: "60%", my: 3, p: 3 }}>
      {files.length !== 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Filename</TableCell>
                <TableCell>Filetype</TableCell>
                <TableCell>Upload Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file, index) => (
                <TableRow
                  key={file.fileUploadID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{file.filename}</TableCell>
                  <TableCell>{file.filetype}</TableCell>
                  <TableCell>{file.uploadDT}</TableCell>
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
