import { useContextBase } from "./useContextBase";

import {
  IdbProviderContext,
  IIdbProviderContext,
} from "../providers/Idb.provider";

export function useIdb(): IIdbProviderContext {
  return useContextBase(IdbProviderContext, "IdbProviderContext");
}
