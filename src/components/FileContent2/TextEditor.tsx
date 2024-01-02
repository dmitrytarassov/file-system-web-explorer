"use client";

import classNames from "classnames";
import React, { useRef } from "react";

import styles from "./styles.module.css";

import { useFileEditor } from "../../hooks/useFileEditor";
import { Editor } from "../../utils/Editor";

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
    if (editor) {
      editor.updateText(e.currentTarget.value);
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

  const watchCursor = (element: HTMLTextAreaElement, editor: Editor) => {
    const interval = setInterval(() => {
      if (editor) {
        const { selectionStart, selectionEnd } = element;

        const [a, b] =
          selectionStart === selectionEnd
            ? [undefined, undefined]
            : selectionEnd > selectionStart
            ? [selectionStart, selectionEnd]
            : [selectionEnd, selectionStart];

        editor.setSelection(a, b);
        editor.setCursorPosition(element.selectionStart);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  };

  React.useEffect(() => {
    let watcher: () => void;
    if (fieldRef?.current && editor) {
      watcher = watchCursor(fieldRef.current, editor);
      fieldRef.current.addEventListener("scroll", sync);
    }
    return () => {
      if (fieldRef?.current) {
        fieldRef.current.removeEventListener("scroll", sync);
      }

      if (watcher) {
        watcher();
      }
    };
  }, [fieldRef, editor]);

  React.useEffect(() => {
    if (fieldRef?.current) {
      fieldRef?.current?.focus();
    }
  }, [editorText]);

  console.log(preview);

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
