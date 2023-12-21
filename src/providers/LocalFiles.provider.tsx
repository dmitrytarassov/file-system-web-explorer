"use client";
import React, { createContext, ReactNode } from "react";

import { File } from "../dtos/File";
import { OpenedFile } from "../dtos/OpenedFile";

export interface ILocalFilesProviderContext {
  readDirectory: (dirHandle: FileSystemDirectoryHandle) => Promise<void>;
  openDirectory: () => Promise<void>;
  readFile: (fileHandle: FileSystemFileHandle | null) => Promise<void>;
  filesInDirectory: File[];
  subDirectories: FileSystemDirectoryHandle[];
  directoriesPath: FileSystemDirectoryHandle[];
  currentFile: OpenedFile | null;
  error: string | null;
  discardError: () => void;
}

export const LocalFilesProviderContext =
  createContext<ILocalFilesProviderContext>({
    readDirectory: async () => {
      //
    },
    openDirectory: async () => {
      //
    },
    readFile: async () => {
      //
    },
    filesInDirectory: [],
    subDirectories: [],
    directoriesPath: [],
    currentFile: null,
    error: null,
    discardError: () => {
      //
    },
  });

export const LocalFilesProvider = ({ children }: { children: ReactNode }) => {
  const [filesInDirectory, set_filesInDirectory] = React.useState<
    ILocalFilesProviderContext["filesInDirectory"]
  >([]);
  const [subDirectories, set_subDirectories] = React.useState<
    ILocalFilesProviderContext["subDirectories"]
  >([]);
  const [directoriesPath, set_directoriesPath] = React.useState<
    ILocalFilesProviderContext["directoriesPath"]
  >([]);
  const [currentFile, set_currentFile] =
    React.useState<ILocalFilesProviderContext["currentFile"]>(null);
  const [error, set_error] =
    React.useState<ILocalFilesProviderContext["error"]>(null);

  const readDirectory: ILocalFilesProviderContext["readDirectory"] = async (
    dirHandle
  ) => {
    const filesInDirectory: File[] = [];
    const subDirectories: FileSystemDirectoryHandle[] = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind === "file") {
        const file = await entry.getFile();
        filesInDirectory.push({
          name: entry.name,
          lastModified: new Date(file.lastModified).toUTCString(),
          size: file.size,
          entry,
        });
      } else if (entry.kind === "directory") {
        subDirectories.push(entry);
      }
    }

    const newDirectoriesPath: FileSystemDirectoryHandle[] = [];
    for (const dir of directoriesPath) {
      if (!(await dir.isSameEntry(dirHandle))) {
        newDirectoriesPath.push(dir);
      } else {
        break;
      }
    }

    newDirectoriesPath.push(dirHandle);
    set_directoriesPath(newDirectoriesPath);

    set_filesInDirectory(filesInDirectory);
    set_subDirectories(subDirectories);
  };

  const openDirectory: ILocalFilesProviderContext["openDirectory"] =
    async () => {
      const _directoriesPath = directoriesPath;
      try {
        set_directoriesPath([]);
        const dirHandle = await window.showDirectoryPicker();
        await readDirectory(dirHandle);
      } catch (e: unknown) {
        const error = e as Error;
        set_directoriesPath(_directoriesPath);
        set_error(error?.message || error?.toString() || "Undefined error");
        console.log(e);
      }
    };

  const readFile: ILocalFilesProviderContext["readFile"] = async (entry) => {
    if (entry) {
      const file = await entry.getFile();
      const text = await file.text();

      set_currentFile({
        name: file.name,
        text,
      });
    } else {
      set_currentFile(null);
    }
  };

  const discardError: ILocalFilesProviderContext["discardError"] = () => {
    set_error(null);
  };

  return (
    <LocalFilesProviderContext.Provider
      value={{
        readDirectory,
        openDirectory,
        readFile,
        filesInDirectory,
        subDirectories,
        directoriesPath,
        currentFile,
        error,
        discardError,
      }}
    >
      {children}
    </LocalFilesProviderContext.Provider>
  );
};
