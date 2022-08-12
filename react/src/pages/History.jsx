import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { historyActions } from "../store/history-actions";
import DownloadDoc from "../ui/DownloadDoc";

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
          <td>{file.filetype}</td>
          <td>{file.uploadDT}</td>
        </tr>
      );
    });
    return historyData;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Upload Data</th>
          <th>Filename</th>
          <th>Filetype</th>
        </tr>
      </thead>
      <tbody>{renderHistoryData()}</tbody>
    </table>
  );
};

export default History;
