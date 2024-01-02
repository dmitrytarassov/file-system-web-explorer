import { OpenedFile } from "./OpenedFile";

export interface PluginFile {
  parse(file: OpenedFile): { result: string };
}
