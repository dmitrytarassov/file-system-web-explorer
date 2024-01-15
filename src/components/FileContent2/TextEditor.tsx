"use client";

import classNames from "classnames";
import React, { useRef } from "react";

import styles from "./styles.module.css";

import { useFileEditor } from "../../hooks/useFileEditor";

type TextEditorProps = {
  //
};

export const TextEditor: React.FC<TextEditorProps> = () => {
  const ref = useRef<HTMLDivElement>();
  const fieldRef = useRef<HTMLTextAreaElement>();

  const { editorText, realText, editor, preview } = useFileEditor();

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    console.log("onChangeHandler");
    if (editor) {
      const position = fieldRef?.current?.selectionStart;

      editor.updateText(e.currentTarget.value, position || 0);
    }
  };

  const sync = () => {
    if (fieldRef?.current && ref?.current) {
      ref.current.scrollTo(
        fieldRef.current.scrollLeft,
        fieldRef.current.scrollTop
      );
    }
  };

  const syncPosition = () => {
    if (fieldRef?.current && editor) {
      editor.setSelection(
        fieldRef.current.selectionStart,
        fieldRef.current.selectionEnd
      );
    }
  };

  React.useEffect(() => {
    if (fieldRef?.current && editor) {
      fieldRef.current.addEventListener("scroll", sync);
      fieldRef.current?.addEventListener("keyup", syncPosition);
      fieldRef.current?.addEventListener("click", syncPosition);
    }
    return () => {
      if (fieldRef?.current) {
        fieldRef.current.removeEventListener("scroll", sync);
        fieldRef.current?.removeEventListener("keyup", syncPosition);
        fieldRef.current?.removeEventListener("click", syncPosition);
      }
    };
  }, [fieldRef, editor]);

  React.useEffect(() => {
    if (editor) {
      editor.setField(fieldRef.current);
    }
  }, [editor, fieldRef?.current]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.splitView]: !!preview,
      })}
    >
      <div className={styles.textEditorContainer}>
        <div
          className={styles.textView}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={ref}
          dangerouslySetInnerHTML={{ __html: `${editorText}` }}
        />
        <textarea
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={fieldRef}
          value={realText}
          onChange={onChangeHandler}
        />
      </div>
      {preview && (
        <div
          className={styles.textEditorContainer}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )}
    </div>
  );
};
