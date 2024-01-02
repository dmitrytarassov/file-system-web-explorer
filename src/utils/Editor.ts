import { cursorPlugin } from "./plugins/cursorPlugin";
import { hePlugin } from "./plugins/hePlugin";
import { mdPreviewPlugin } from "./plugins/md/mdPreviewPlugin";

import { IPlugin } from "../dtos/IPlugin";

interface Watcher {
  (data: {
    text: string;
    originalText: string;
    base: string;
    preview?: string;
  }): void | Promise<void>;
}

export class Editor {
  private text: string;
  private watchers: Watcher[] = [];
  private cursorPosition = 0;
  private selectionStart = -1;
  private selectionEnd = -1;
  private plugins: IPlugin[] = [hePlugin, cursorPlugin, mdPreviewPlugin];

  constructor(
    private base: string,
    private language: string,
    watcher?: Watcher
  ) {
    this.text = base;

    if (watcher) {
      this.watchers.push(watcher);
      watcher({
        text: base,
        originalText: base,
        base,
      });
    }
  }

  public updateText(value: string) {
    this.text = value;
    this.setSelection(undefined, undefined);
    this.update();
  }

  public restore() {
    this.text = this.base;
    this.update();
  }

  private update() {
    let text = this.text;
    let cursorPosition = this.cursorPosition;
    let selectionStart = this.selectionStart;
    let selectionEnd = this.selectionEnd;
    let preview: string | undefined;
    const originalText = text;

    for (const plugin of this.plugins) {
      const result = plugin(
        text,
        {
          cursorPosition,
          selectionStart,
          selectionEnd,
          language: this.language,
        },
        originalText
      );
      text = result.text;
      if (result.options?.cursorPosition) {
        cursorPosition = result.options?.cursorPosition;
      }
      if (result.options?.selectionStart) {
        selectionStart = result.options?.selectionStart;
      }
      if (result.options?.selectionEnd) {
        selectionEnd = result.options?.selectionEnd;
      }
      preview = result.previewText;
    }

    for (const watcher of this.watchers) {
      watcher({
        text,
        originalText: this.text,
        base: this.base,
        preview,
      });
    }
  }

  public setCursorPosition(position: number) {
    const needUpdate = this.cursorPosition !== position;
    this.cursorPosition = position;

    if (needUpdate) {
      this.update();
    }
  }

  public setSelection(
    start: number | undefined = -1,
    end: number | undefined = -1
  ) {
    const needUpdate =
      this.selectionStart !== start || this.selectionEnd !== end;
    this.selectionStart = start;
    this.selectionEnd = end;

    if (needUpdate) {
      this.update();
    }
  }
}
