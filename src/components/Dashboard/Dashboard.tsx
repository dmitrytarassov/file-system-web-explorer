"use client";

import classNames from "classnames";
import React from "react";

import styles from "./Dashboard.module.css";

import { useLocalFiles } from "../../hooks/useLocalFiles";
import { ExplorerContextMenuProvider } from "../../providers/ExplorerContextMenu.provider";
import { FileEditorProvider } from "../../providers/FileEditor.provider";
import { DirectoryExplorer } from "../DirectoryExplorer/DirectoryExplorer";
import { DirectoryExplorerContextMenu } from "../DirectoryExplorer/DirectoryExplorerContextMenu";
import { FileContent2 } from "../FileContent2/FileContent2";
import { Footer } from "../Footer/Footer";
import { Path } from "../Path/Path";

type DashboardProps = {
  //
};

export const Dashboard: React.FC<DashboardProps> = () => {
  const { dir } = useLocalFiles();

  return (
    <main className={styles.main}>
      <nav className={classNames({ [styles.empty]: !dir }, styles.nav)}>
        <ExplorerContextMenuProvider>
          <DirectoryExplorer />
          <DirectoryExplorerContextMenu />
        </ExplorerContextMenuProvider>
      </nav>
      <section className={classNames(styles.editor, styles.file)}>
        <FileEditorProvider>
          <FileContent2 />
        </FileEditorProvider>
      </section>
      <div className={classNames(styles.links, styles.footer)}>
        <Footer />
      </div>
      <div className={classNames(styles.path, styles.footer)}>
        <Path />
      </div>
    </main>
  );
};
