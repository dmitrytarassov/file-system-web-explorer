"use client";
import React, { createContext, ReactNode } from "react";

import { empty } from "../utils/empty";

export interface IExplorerContextMenuProviderContext {
  anchor: HTMLElement | null;
  isOpen: boolean;
  close: () => void;
  open: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ExplorerContextMenuProviderContext =
  createContext<IExplorerContextMenuProviderContext>({
    anchor: null,
    isOpen: false,
    close: empty,
    open: empty,
  });

export const ExplorerContextMenuProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [anchor, set_anchor] =
    React.useState<IExplorerContextMenuProviderContext["anchor"]>(null);
  const isOpen = Boolean(anchor);

  const open: IExplorerContextMenuProviderContext["open"] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    set_anchor(event.currentTarget);
  };

  const close: IExplorerContextMenuProviderContext["close"] = () => {
    set_anchor(null);
  };

  return (
    <ExplorerContextMenuProviderContext.Provider
      value={{
        anchor,
        isOpen,
        open,
        close,
      }}
    >
      {children}
    </ExplorerContextMenuProviderContext.Provider>
  );
};
