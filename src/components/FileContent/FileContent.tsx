"use client";

import { Cancel, Restore, Save } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Editor } from "./Editor";
import { FileImage } from "./FileImage";
import { NoFileSelected } from "./NoFileSelected";
import styles from "./styles.module.css";

import { useFileEditor } from "../../hooks/useFileEditor";
import { useLocalFiles } from "../../hooks/useLocalFiles";
import { getFileLanguage } from "../../utils/getFileLanguage";

type FileContentProps = {
  //
};

export const FileContent: React.FC<FileContentProps> = () => {
  const { currentFile, readFile } = useLocalFiles();
  const { isModified, isEditing, enableEditing, disableEditing, save } =
    useFileEditor();

  const language = getFileLanguage(currentFile?.name, currentFile?.size);

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
          {language.type === "image" && (
            <FileImage
              fileName={currentFile.name}
              fileData={currentFile.text}
              file={currentFile.entity}
            />
          )}
          {(language.type === "text" || isEditing) && (
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

          {language.type === "code" && !isEditing && (
            <div onClick={enableEditing}>
              <SyntaxHighlighter
                showInlineLineNumbers
                language={language.language}
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
