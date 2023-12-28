import { File } from "../dtos/File";

export class Dir {
  files: File[] = [];
  subDirs: Dir[] = [];
  current = false;
  static directories: Set<Dir> = new Set<Dir>();
  static currentDir: Dir | undefined = undefined;

  constructor(
    public directoryHandle: FileSystemDirectoryHandle,
    public parent?: Dir
  ) {
    Dir.directories.add(this);
  }

  load = async () => {
    const filesInDirectory: File[] = [];
    const subDirectories: Dir[] = [];

    for await (const entry of this.directoryHandle.values()) {
      if (entry.kind === "file") {
        const file = await entry.getFile();
        filesInDirectory.push({
          name: entry.name,
          lastModified: new Date(file.lastModified).toUTCString(),
          size: file.size,
          entry,
        });
      } else if (entry.kind === "directory") {
        subDirectories.push(new Dir(entry, this));
      }
    }

    this.files = filesInDirectory;
    this.subDirs = subDirectories.sort((a, b) =>
      a.directoryHandle.name > b.directoryHandle.name ? 1 : -1
    );
    Dir.resetCurrent();
    Dir.currentDir = this;
    this.current = true;
  };

  static resetCurrent() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const dir of [...Dir.directories]) {
      dir.current = false;
    }
  }

  getCurrent(): Dir | undefined {
    return Dir.currentDir;
  }

  getPath(): Dir[] {
    let path: Dir[] = [this];

    let target = this.parent;

    while (target) {
      if (target) {
        path = [target, ...path];
      }
      target = target.parent;
    }

    return path;
  }
}
