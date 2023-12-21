import { useContextBase } from "./useContextBase";

import {
  ILocalFilesProviderContext,
  LocalFilesProviderContext,
} from "../providers/LocalFiles.provider";

export function useLocalFiles(): ILocalFilesProviderContext {
  return useContextBase(LocalFilesProviderContext, "LocalFilesProviderContext");
}
