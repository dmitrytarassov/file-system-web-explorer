"use client";

import { Breadcrumbs, Link } from "@mui/material";
import React, { MouseEventHandler } from "react";

import { useLocalFiles } from "../../hooks/useLocalFiles";
import { Dir } from "../../utils/Dir";

type PathProps = {
  //
};

export const Path: React.FC<PathProps> = () => {
  const { dir, readDirectory } = useLocalFiles();
  const path = dir?.getPath() || [];

  const onPathClickHandler: (
    dir: Dir
  ) => MouseEventHandler<HTMLAnchorElement> = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    void readDirectory(dir);
  };

  return (
    <Breadcrumbs separator="/">
      {path.map((dir) => (
        <Link
          underline="hover"
          key={dir.directoryHandle.name}
          onClick={onPathClickHandler(dir)}
          href="#"
        >
          {dir.directoryHandle.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
