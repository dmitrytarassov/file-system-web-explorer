"use client";

import { Cancel, Restore, Save } from "@mui/icons-material";
import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Editor } from "./Editor";
import { FileImage } from "./FileImage";
import { NoFileSelected } from "./NoFileSelected";
import styles from "./styles.module.css";

import { useFileEditor } from "../../hooks/useFileEditor";
import { useLocalFiles } from "../../hooks/useLocalFiles";

type FileContentProps = {
  //
};

export const FileContent: React.FC<FileContentProps> = () => {
  const { currentFile } = useLocalFiles();
  const { isModified, isEditing, enableEditing, disableEditing, save } =
    useFileEditor();

  return (
    <>
      {currentFile ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <Typography variant="h6">{currentFile.name}</Typography>
            <ButtonGroup>
              {isEditing && (
                <Button
                  size="small"
                  startIcon={<Cancel />}
                  onClick={disableEditing}
                >
                  Cancel
                </Button>
              )}
              <Button
                disabled={!isModified}
                size="small"
                startIcon={<Save />}
                onClick={save}
              >
                Save
              </Button>
              <Button
                disabled={!isModified}
                size="small"
                startIcon={<Restore />}
              >
                Restore
              </Button>
            </ButtonGroup>
          </div>
          {currentFile.type === "image" && (
            <FileImage
              fileName={currentFile.name}
              fileData={currentFile.text}
              file={currentFile.entity}
            />
          )}
          {(currentFile.type === "text" || isEditing) && (
            <Editor>
              <pre
                className={styles.fileContent}
                style={{
                  ...theme.hljs,
                  backgroundColor: theme.hljs.background as string,
                }}
              >
                <code>{currentFile.text}</code>
              </pre>
            </Editor>
          )}

          {currentFile.type === "code" && !isEditing && (
            <div onClick={enableEditing}>
              <SyntaxHighlighter
                showInlineLineNumbers
                language={currentFile.language}
                style={theme}
                showLineNumbers
              >
                {currentFile.text}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      ) : (
        <NoFileSelected />
      )}
    </>
  );
};
