"use client";
import React, { createContext, ReactNode } from "react";

import { AsyncVoidFn, VoidFn } from "../dtos/common";
import { useLocalFiles } from "../hooks/useLocalFiles";
import { empty, emptyAsync } from "../utils/empty";

export interface IFileEditorProviderContext {
  updateFileText: (value: string) => void;
  isModified: boolean;
  isEditing: boolean;
  enableEditing: VoidFn;
  disableEditing: VoidFn;
  restore: AsyncVoidFn;
  save: AsyncVoidFn;
}

export const FileEditorProviderContext =
  createContext<IFileEditorProviderContext>({
    updateFileText: empty,
    isModified: false,
    isEditing: false,
    enableEditing: empty,
    disableEditing: empty,
    restore: emptyAsync,
    save: emptyAsync,
  });

export const FileEditorProvider = ({ children }: { children: ReactNode }) => {
  const [currentFileBaseText, set_currentFileBaseText] =
    React.useState<string>("");
  const [currentFileNewText, set_currentFileNewText] =
    React.useState<string>("");
  const [isEditing, set_isEditing] =
    React.useState<IFileEditorProviderContext["isEditing"]>(false);

  const { currentFile, updateFileWithContent } = useLocalFiles();

  React.useEffect(() => {
    set_currentFileBaseText((currentFile && currentFile.text) || "");
    set_currentFileNewText((currentFile && currentFile.text) || "");
    set_isEditing(false);
  }, [currentFile]);

  const restore = async () => {
    //
  };

  React.useEffect(() => {
    //
  }, []);

  const save = async () => {
    if (currentFile) {
      await updateFileWithContent(currentFile.handle, currentFileNewText);
    }
  };

  return (
    <FileEditorProviderContext.Provider
      value={{
        updateFileText: set_currentFileNewText,
        isModified:
          (currentFileNewText === "" && currentFileBaseText === "") ||
          currentFileNewText !== currentFileBaseText,
        restore,
        isEditing,
        enableEditing: () => set_isEditing(true),
        disableEditing: () => set_isEditing(false),
        save,
      }}
    >
      {children}
    </FileEditorProviderContext.Provider>
  );
};
