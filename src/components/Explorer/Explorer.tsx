"use client";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";

import { useLocalFiles } from "../../hooks/useLocalFiles";
import { byteConverter } from "../../utils/byteConverter";

type ExplorerProps = {
  //
};

export const Explorer: React.FC<ExplorerProps> = () => {
  const {
    filesInDirectory,
    subDirectories,
    directoriesPath,
    readDirectory,
    openDirectory,
    readFile,
  } = useLocalFiles();

  const readFileHandler = (file: FileSystemFileHandle) => () => {
    void readFile(file);
  };

  const readDirectoryHandler = (dir: FileSystemDirectoryHandle) => () => {
    void readDirectory(dir);
  };

  return (
    <>
      <Grid mb={2} md={12} item>
        <TextField
          label="Directory"
          fullWidth
          value={directoriesPath.map((e) => e.name).join("/")}
          onClick={openDirectory}
        />
      </Grid>
      <Grid mb={2} md={12} item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>Size</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {directoriesPath.length > 1 && (
                <TableRow hover>
                  <TableCell
                    colSpan={3}
                    onClick={readDirectoryHandler(
                      directoriesPath[directoriesPath.length - 2]
                    )}
                  >
                    ..
                  </TableCell>
                </TableRow>
              )}
              {subDirectories.map((dir) => (
                <TableRow key={dir.name} hover>
                  <TableCell colSpan={3} onClick={readDirectoryHandler(dir)}>
                    {dir.name}
                  </TableCell>
                </TableRow>
              ))}
              {filesInDirectory.map((file) => (
                <TableRow
                  key={file.name}
                  hover
                  onClick={readFileHandler(file.entry)}
                >
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.lastModified}</TableCell>
                  <TableCell>{byteConverter(file.size, 2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
