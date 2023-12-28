export type OpenedFile = {
  name: string;
  text: string;
  size: number;
  entity: File;
  handle: FileSystemFileHandle;
};
