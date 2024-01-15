"use client";

import { FileOpen, Folder, MenuOpen } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import classNames from "classnames";
import React from "react";

import styles from "./DirectoryExplorer.module.scss";

import { useExplorerContextMenu } from "../../hooks/useExplorerContextMenu";
import { useFileEditor } from "../../hooks/useFileEditor";
import { useLocalFiles } from "../../hooks/useLocalFiles";
import { Dir } from "../../utils/Dir";
import { LanguageLogo } from "../LanguageLogo/LanguageLogo";

type DirectoryExplorerProps = {
  //
};

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = () => {
  const { open } = useExplorerContextMenu();
  const { readDirectory, showDirectoryPicker, readFile, dir, currentFile } =
    useLocalFiles();
  const { isModified } = useFileEditor();

  const openDir = (dir: Dir) => () => {
    readDirectory(dir);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      {dir ? (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <List className={styles.list}>
            {dir.parent && (
              <div className={styles.element} onClick={openDir(dir.parent)}>
                <div className={styles.icon}>..</div>
                <div className={styles.name}>
                  {dir.parent.directoryHandle.name}
                </div>
              </div>
            )}

            {dir.subDirs.map((dir) => (
              <div
                className={styles.element}
                key={dir.directoryHandle.name}
                onClick={openDir(dir)}
              >
                <div className={styles.icon}>
                  <Folder />
                </div>
                <div className={styles.name}>{dir.directoryHandle.name}</div>
              </div>
            ))}
            {dir.files.map((file) => (
              <div
                className={classNames(styles.element, {
                  [styles.selected]: currentFile?.entity.name === file.name,
                })}
                key={file.name}
                onClick={() => readFile(file.entry)}
              >
                <div className={styles.icon}>
                  <LanguageLogo fileName={file.name} />
                </div>
                <div className={styles.name}>{file.name}</div>
                {currentFile?.entity.name === file.name ? (
                  <div
                    className={classNames(styles.suffix, {
                      [styles.updated]: isModified,
                    })}
                  >
                    *
                  </div>
                ) : null}
              </div>
            ))}
          </List>
        </Box>
      ) : (
        <Button variant="outlined" size="small" onClick={showDirectoryPicker}>
          Open project
        </Button>
      )}
    </Grid>
  );
};
