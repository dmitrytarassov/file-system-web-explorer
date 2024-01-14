"use client";
import * as idb from "idb-keyval";
import React, { createContext, ReactNode, useEffect } from "react";

import { OpenedFile } from "../dtos/OpenedFile";
import { AsyncTyped } from "../dtos/common";
import { Dir } from "../utils/Dir";
import { empty, emptyAsync } from "../utils/empty";
import { getErrorDescription } from "../utils/getErrorDescription";
import { getFileInfo } from "../utils/getFileInfo";

export interface ILocalFilesProviderContext {
  readDirectory: (dirHandle: Dir) => Promise<void>;
  showDirectoryPicker: () => Promise<void>;
  readFile: (fileHandle: FileSystemFileHandle | null) => Promise<void>;
  currentFile: OpenedFile | null;
  error: string | null;
  discardError: () => void;
  dir: Dir | undefined;
  recentlyOpenedDirectories: Set<FileSystemDirectoryHandle>;
  updateFileWithContent: (
    handle: FileSystemFileHandle,
    content: string
  ) => Promise<void>;
  openRecentDir: AsyncTyped<FileSystemDirectoryHandle, void>;
  projectOpenedFiles: Map<Dir, OpenedFile>;
}

export const LocalFilesProviderContext =
  createContext<ILocalFilesProviderContext>({
    readDirectory: emptyAsync,
    showDirectoryPicker: emptyAsync,
    readFile: emptyAsync,
    currentFile: null,
    error: null,
    discardError: empty,
    dir: undefined,
    recentlyOpenedDirectories: new Set(),
    updateFileWithContent: emptyAsync,
    openRecentDir: emptyAsync,
    projectOpenedFiles: new Map(),
  });

export const LocalFilesProvider = ({ children }: { children: ReactNode }) => {
  const [root, set_root] = React.useState<string>("");
  const [currentFile, set_currentFile] =
    React.useState<ILocalFilesProviderContext["currentFile"]>(null);
  const [error, set_error] =
    React.useState<ILocalFilesProviderContext["error"]>(null);
  const [dir, set_dir] = React.useState<ILocalFilesProviderContext["dir"]>();
  const [recentlyOpenedDirectories, set_recentlyOpenedDirectories] =
    React.useState<ILocalFilesProviderContext["recentlyOpenedDirectories"]>(
      new Set()
    );
  const [projectOpenedFiles, set_projectOpenedFiles] = React.useState<
    ILocalFilesProviderContext["projectOpenedFiles"]
  >(new Map());

  const updateFileWithContent: ILocalFilesProviderContext["updateFileWithContent"] =
    async (handle, content) => {
      // Create a FileSystemWritableFileStream to write to.
      const writable = await handle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(content);
      // Close the file and write the contents to disk.
      await writable.close();

      if (dir) {
        readDirectory(dir);
      }

      if (currentFile) {
        readFile(handle);
      }
    };

  const readDirectory: ILocalFilesProviderContext["readDirectory"] = async (
    dir
  ) => {
    await idb.set("dir", dir.directoryHandle);
    console.log(dir);
    await dir.load();
    set_dir(dir);
  };

  const showDirectoryPicker: ILocalFilesProviderContext["showDirectoryPicker"] =
    async () => {
      try {
        const dirHandle = await window.showDirectoryPicker();
        const dir = new Dir(dirHandle);
        set_root(dir.directoryHandle.name);
        set_recentlyOpenedDirectories((set) => {
          set.add(dir.directoryHandle);
          idb.set("recents", set);
          return set;
        });

        await readDirectory(dir);
      } catch (e: unknown) {
        const error = e as Error;
        set_error(
          getErrorDescription(
            error?.message || error?.toString() || "Undefined error"
          )
        );
        console.log(e);
      }
    };

  const readFile: ILocalFilesProviderContext["readFile"] = async (entry) => {
    if (entry) {
      const file = await entry.getFile();
      const text = await file.text();

      set_currentFile({
        entity: file,
        name: file.name,
        text,
        size: file.size,
        handle: entry,
        ...getFileInfo(file.name),
      });
    } else {
      set_currentFile(null);
    }
  };

  const discardError: ILocalFilesProviderContext["discardError"] = () => {
    set_error(null);
  };

  const loadFromIdb = async () => {
    try {
      const dirs = await idb.get("recents");
      if (dirs) {
        set_recentlyOpenedDirectories(dirs);
      }
    } catch (e) {
      console.log(e);
      // do nothing?
    }
  };

  useEffect(() => {
    void loadFromIdb();
  }, []);

  const openRecentDir: ILocalFilesProviderContext["openRecentDir"] = async (
    handle
  ) => {
    try {
      const result = await handle.requestPermission({ mode: "readwrite" });
      if (result === "granted") {
        const dir = new Dir(handle);
        await readDirectory(dir);
        set_root(dir.directoryHandle.name);
        console.log(`file_${dir.directoryHandle.name}`);
        const file = await idb.get(`file_${dir.directoryHandle.name}`);
        if (file) {
          readFile(file.handle);
        }
        console.log(file);
      } else {
        throw new Error("Rejected");
      }
    } catch (e: unknown) {
      console.log(e);
      const error = e as Error;
      set_error(
        getErrorDescription(
          error?.message || error?.toString() || "Undefined error"
        )
      );
    }
  };

  React.useEffect(() => {
    if (dir && currentFile) {
      set_projectOpenedFiles((map) => {
        map.set(dir, currentFile);
        console.log(`file_${root}`);
        void idb.set(`file_${root}`, currentFile);
        return map;
      });
    }
  }, [currentFile, dir]);

  // useEffect(() => {
  //   idb.clear();
  // }, []);

  return (
    <LocalFilesProviderContext.Provider
      value={{
        dir,
        readDirectory,
        showDirectoryPicker,
        readFile,
        currentFile,
        error,
        discardError,
        recentlyOpenedDirectories,
        updateFileWithContent,
        openRecentDir,
        projectOpenedFiles,
      }}
    >
      {children}
    </LocalFilesProviderContext.Provider>
  );
};
