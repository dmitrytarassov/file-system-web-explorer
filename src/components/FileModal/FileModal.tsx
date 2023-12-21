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
import { getFileLanguage } from "../../utils/getFileLanguage";

type FileModalProps = {
  //
};

export const FileModal: React.FC<FileModalProps> = () => {
  const { currentFile, readFile } = useLocalFiles();

  const onModalCloseHandler = () => {
    void readFile(null);
  };

  const language = getFileLanguage(currentFile?.name);

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
            {language === "text" ? (
              <Typography variant="caption" className={styles.fileContent}>
                {currentFile.text}
              </Typography>
            ) : (
              <SyntaxHighlighter
                showInlineLineNumbers
                language={getFileLanguage(currentFile.name)}
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
