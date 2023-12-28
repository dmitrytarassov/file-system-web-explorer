"use client";

import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";

import { useExplorerContextMenu } from "../../hooks/useExplorerContextMenu";

type ContextMenuProps = {
  //
};

export const DirectoryExplorerContextMenu: React.FC<ContextMenuProps> = () => {
  const { anchor, isOpen, close } = useExplorerContextMenu();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchor}
      open={isOpen}
      onClose={close}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem>New File</MenuItem>
      <MenuItem>New directory</MenuItem>
      <Divider />
      <MenuItem>Copy</MenuItem>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Delete</MenuItem>
      <Divider />
      <MenuItem>Rename</MenuItem>
    </Menu>
  );
};
