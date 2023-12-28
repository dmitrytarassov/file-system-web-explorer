"use client";
import idb, { IDBPDatabase } from "idb";
import React, { createContext, ReactNode } from "react";

import { emptyAsync } from "../utils/empty";

type DatabaseStructure = {
  file: FileSystemFileHandle;
  directory: FileSystemDirectoryHandle;
};
export interface IIdbProviderContext {
  db?: IDBPDatabase<DatabaseStructure>;
  get: <T>(key: "file" | "directory") => Promise<T | void>;
}

const keyValStorageName = "kv_storage";

export const IdbProviderContext = createContext<IIdbProviderContext>({
  get: emptyAsync,
});

export const IdbProvider = ({ children }: { children: ReactNode }) => {
  const [db, set_db] = React.useState<IIdbProviderContext["db"]>();

  const initDb = async () => {
    // const db = await idb.openDB<DatabaseStructure>("files-explorer", 1, {
    //   upgrade(db) {
    //     db.createObjectStore(keyValStorageName);
    //   },
    // });
    // set_db(db);
  };

  React.useEffect(() => {
    void initDb();
  }, []);

  const _get = emptyAsync;

  // const _get: IIdbProviderContext["get"] = async <
  //   T extends {
  //     /**/
  //   }
  // >(
  //   key
  // ): Promise<T | void> => {
  //   if (db) {
  //     const result: T = await db.get(keyValStorageName, key);
  //     return result;
  //   }
  // };

  const save = async (
    obj: DatabaseStructure["file"] | DatabaseStructure["directory"]
  ) => {
    await db?.put(keyValStorageName, obj, obj.isFile ? "file" : "directory");
  };

  return (
    <IdbProviderContext.Provider value={{ db, get: _get }}>
      {children}
    </IdbProviderContext.Provider>
  );
};
