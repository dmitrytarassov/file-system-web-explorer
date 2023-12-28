"use client";

import classNames from "classnames";
import React, { FormEventHandler, useRef } from "react";

import styles from "./styles.module.css";

import { useFileEditor } from "../../hooks/useFileEditor";
import { useLocalFiles } from "../../hooks/useLocalFiles";

type EditorProps = {
  children: React.ReactNode;
  //
};

export const Editor: React.FC<EditorProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>();
  const { currentFile } = useLocalFiles();
  const { isEditing, isModified, updateFileText, disableEditing } =
    useFileEditor();

  React.useEffect(() => {
    if (ref?.current) {
      const codeElement = ref?.current?.querySelector("pre");
      if (codeElement) {
        codeElement.contentEditable = "true";
      }

      ref.current.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          disableEditing();
        }
      };
    }
  }, [ref?.current, children, currentFile]);

  const onContentEdit: FormEventHandler<HTMLDivElement> = (event) => {
    updateFileText(ref?.current?.innerText || "");
  };

  return (
    <div
      className={classNames(styles.editorContainer, {
        [styles.active]: isEditing || isModified,
      })}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      onInput={onContentEdit}
    >
      {currentFile ? children : null}
    </div>
  );
};
