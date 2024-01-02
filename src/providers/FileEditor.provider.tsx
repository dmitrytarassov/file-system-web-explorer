"use client";
import React, { createContext, ReactNode } from "react";

import { AsyncVoidFn, VoidFn } from "../dtos/common";
import { useLocalFiles } from "../hooks/useLocalFiles";
import { Editor } from "../utils/Editor";
import { empty, emptyAsync } from "../utils/empty";

export interface IFileEditorProviderContext {
  updateFileText: (value: string) => void;
  isModified: boolean;
  isEditing: boolean;
  enableEditing: VoidFn;
  disableEditing: VoidFn;
  restore: AsyncVoidFn;
  save: AsyncVoidFn;
  currentFileNewText: string;
  editor?: Editor;
  editorText: string;
  realText: string;
}

export const FileEditorProviderContext =
  createContext<IFileEditorProviderContext>({
    currentFileNewText: "",
    updateFileText: empty,
    isModified: false,
    isEditing: false,
    enableEditing: empty,
    disableEditing: empty,
    restore: emptyAsync,
    save: emptyAsync,
    editorText: "",
    realText: "",
  });

export const FileEditorProvider = ({ children }: { children: ReactNode }) => {
  const [realText, set_realText] = React.useState<string>("");
  const [editor, set_editor] = React.useState<Editor>();
  const [editorText, set_editorText] = React.useState<string>("");
  const [currentFileBaseText, set_currentFileBaseText] =
    React.useState<string>("");
  const [currentFileNewText, set_currentFileNewText] =
    React.useState<string>("");
  const [isEditing, set_isEditing] =
    React.useState<IFileEditorProviderContext["isEditing"]>(false);

  const { currentFile, updateFileWithContent } = useLocalFiles();

  React.useEffect(() => {
    if (currentFile) {
      set_editor(
        new Editor(currentFile.text, (data) => {
          set_editorText(data.text);
          set_realText(data.originalText);
        })
      );
    } else {
      set_editor(undefined);
    }

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
        currentFileNewText,
        updateFileText: set_currentFileNewText,
        isModified:
          (currentFileNewText === "" && currentFileBaseText === "") ||
          currentFileNewText !== currentFileBaseText,
        restore,
        isEditing,
        enableEditing: () => set_isEditing(true),
        disableEditing: () => set_isEditing(false),
        save,
        editor,
        editorText,
        realText,
      }}
    >
      {children}
    </FileEditorProviderContext.Provider>
  );
};
