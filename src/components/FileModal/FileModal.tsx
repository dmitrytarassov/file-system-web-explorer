"use client";

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

import styles from "./FileModal.module.css";

import { useLocalFiles } from "../../hooks/useLocalFiles";

type FileModalProps = {
  //
};

export const FileModal: React.FC<FileModalProps> = () => {
  const { currentFile, readFile } = useLocalFiles();

  const [name, ext]: string[] = currentFile?.name?.split(".") || ["", ""];

  let lang =
    {
      ts: "typescript",
      js: "javascript",
      json: "json",
      cpp: "cpp",
      h: "cpp",
      md: "markdown",
    }[ext] || "";

  if (name.includes("CMake")) {
    lang = "cpp";
  } else if (name === ".gitignore") {
    lang = "git";
  }

  const onModalCloseHandler = () => {
    void readFile(null);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={!!currentFile}
      onClose={onModalCloseHandler}
    >
      {currentFile && (
        <>
          <DialogTitle>{currentFile.name}</DialogTitle>
          <DialogContent>
            {ext === "txt" ? (
              <Typography variant="caption" className={styles.fileContent}>
                {currentFile.text}
              </Typography>
            ) : (
              <SyntaxHighlighter
                showInlineLineNumbers
                language={lang}
                style={theme}
              >
                {currentFile.text}
              </SyntaxHighlighter>
            )}
          </DialogContent>
          <DialogActions>
            <ButtonGroup>
              <Button onClick={onModalCloseHandler}>Close</Button>
            </ButtonGroup>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
