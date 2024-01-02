"use client";

import React from "react";

import { FileImage } from "./FileImage";
import { NoFileSelected } from "./NoFileSelected";
import { TextEditor } from "./TextEditor";

import { useLocalFiles } from "../../hooks/useLocalFiles";

type FileEditor2Props = {
  //
};

export const FileContent2: React.FC<FileEditor2Props> = () => {
  const { currentFile } = useLocalFiles();

  return (
    <>
      {currentFile ? (
        currentFile.type === "image" ? (
          <FileImage
            fileName={currentFile.name}
            fileData={currentFile.text}
            file={currentFile.entity}
          />
        ) : (
          <TextEditor />
        )
      ) : (
        <NoFileSelected />
      )}
    </>
  );
};
