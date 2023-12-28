const LS_DIRECTORY_STORAGE_KEY = "LS_DIRECTORY_STORAGE_KEY";

export const getDirectoryFromLs = (): FileSystemDirectoryHandle | void => {
  const dir = window.localStorage.getItem(LS_DIRECTORY_STORAGE_KEY);
  if (dir) {
    // const data = JSON.parse(dir);
    // const handle = new FileSystemDirectoryHandle(data);
    // return handle;
  }
};
