import { useContextBase } from "./useContextBase";

import {
  ExplorerContextMenuProviderContext,
  IExplorerContextMenuProviderContext,
} from "../providers/ExplorerContextMenu.provider";

export function useExplorerContextMenu(): IExplorerContextMenuProviderContext {
  return useContextBase(
    ExplorerContextMenuProviderContext,
    "ExplorerContextMenuProviderContext"
  );
}
