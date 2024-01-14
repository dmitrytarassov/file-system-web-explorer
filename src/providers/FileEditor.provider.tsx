"use client";
import { handle } from "hast-util-to-html/lib/handle";
import React, { createContext, ReactNode } from "react";

import { AsyncVoidFn } from "../dtos/common";
import { useLocalFiles } from "../hooks/useLocalFiles";
import { Editor } from "../utils/Editor";
import { empty, emptyAsync } from "../utils/empty";
import { KeyboardListener } from "../utils/keyboardListener";

export interface IFileEditorProviderContext {
  save: AsyncVoidFn;
  editor?: Editor;
  editorText: string;
  realText: string;
  preview?: string;
}

export const FileEditorProviderContext =
  createContext<IFileEditorProviderContext>({
    save: emptyAsync,
    editorText: "",
    realText: "",
  });

export const FileEditorProvider = ({ children }: { children: ReactNode }) => {
  const [realText, set_realText] = React.useState<string>("");
  const [editor, set_editor] = React.useState<Editor>();
  const [editorText, set_editorText] = React.useState<string>("");
  const [preview, set_preview] = React.useState<string | undefined>();

  const { currentFile, updateFileWithContent } = useLocalFiles();

  React.useEffect(() => {
    if (currentFile) {
      set_editor(
        new Editor(currentFile.text, currentFile.language || "", (data) => {
          set_editorText(data.text);
          set_realText(data.originalText);
          set_preview(data.preview);
        })
      );
    } else {
      set_editor(undefined);
    }
  }, [currentFile]);

  const saveFile =
    (handle: FileSystemFileHandle, content: string) => async () => {
      await updateFileWithContent(handle, content);
    };

  React.useEffect(() => {
    const keyboardListener = KeyboardListener.getInstance();
    const handler = currentFile?.handle
      ? saveFile(currentFile.handle, realText)
      : empty;
    keyboardListener.on("s", [["command"], ["shift", "alt"]], handler);

    return () => {
      keyboardListener.off("s", [["command"], ["shift", "alt"]], handler);
    };
  }, [currentFile?.handle, realText]);

  const save = async () => {
    if (currentFile) {
      // await updateFileWithContent(currentFile.handle, currentFileNewText);
    }
  };

  return (
    <FileEditorProviderContext.Provider
      value={{
        save,
        editor,
        editorText,
        realText,
        preview,
      }}
    >
      {children}
    </FileEditorProviderContext.Provider>
  );
};
