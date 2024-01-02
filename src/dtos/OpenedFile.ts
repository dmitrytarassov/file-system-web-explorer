import { FileType } from "./FileType";

export type OpenedFile = {
  name: string;
  text: string;
  size: number;
  entity: File;
  handle: FileSystemFileHandle;
  type: FileType;
  language?: string;
  extension: string;
};
