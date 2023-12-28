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
import React from "react";

import styles from "./DirectoryExplorer.module.css";

import { useExplorerContextMenu } from "../../hooks/useExplorerContextMenu";
import { useLocalFiles } from "../../hooks/useLocalFiles";
import { Dir } from "../../utils/Dir";

type DirectoryExplorerProps = {
  //
};

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = () => {
  const { open } = useExplorerContextMenu();
  const { readDirectory, showDirectoryPicker, readFile, dir, currentFile } =
    useLocalFiles();

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
              <ListItem disablePadding onClick={openDir(dir.parent)}>
                <ListItemButton>
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary="..." />
                </ListItemButton>
              </ListItem>
            )}
            {dir.subDirs.map((dir) => (
              <ListItem
                disablePadding
                key={dir.directoryHandle.name}
                onClick={openDir(dir)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary={dir.directoryHandle.name} />
                </ListItemButton>
              </ListItem>
            ))}
            {dir.files.map((file) => (
              <ListItem
                disablePadding
                key={file.name}
                onClick={() => readFile(file.entry)}
                selected={currentFile?.entity.name === file.name}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <FileOpen />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />

                  <ListItemSecondaryAction onClick={open}>
                    <MenuOpen />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
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
