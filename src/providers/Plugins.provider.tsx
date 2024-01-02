"use client";
import React, { createContext, ReactNode } from "react";

import { OpenedFile } from "../dtos/OpenedFile";
import { useLocalFiles } from "../hooks/useLocalFiles";

export interface IPluginsProviderContext {
  openedFile?: {
    file: OpenedFile;
  };
}

export const PluginsProviderContext = createContext<IPluginsProviderContext>(
  {}
);

// const plugins

export const PluginsProvider = ({ children }: { children: ReactNode }) => {
  const [openedFile, set_openedFile] =
    React.useState<IPluginsProviderContext["openedFile"]>();
  const { currentFile } = useLocalFiles();

  React.useEffect(() => {
    if (currentFile) {
      set_openedFile({ file: currentFile });
    } else {
      set_openedFile(undefined);
    }
  }, [currentFile]);

  return (
    <PluginsProviderContext.Provider value={{ openedFile }}>
      {children}
    </PluginsProviderContext.Provider>
  );
};
