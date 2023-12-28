import { useContextBase } from "./useContextBase";

import {
  FileEditorProviderContext,
  IFileEditorProviderContext,
} from "../providers/FileEditor.provider";

export function useFileEditor(): IFileEditorProviderContext {
  return useContextBase(FileEditorProviderContext, "FileEditorProviderContext");
}
