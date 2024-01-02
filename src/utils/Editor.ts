import * as he from "he";

import { cursorPlugin } from "./plugins/cursorPlugin";
import { hePlugin } from "./plugins/hePlugin";

import { IPlugin } from "../dtos/IPlugin";

interface Watcher {
  (data: {
    text: string;
    originalText: string;
    base: string;
  }): void | Promise<void>;
}

export class Editor {
  private text: string;
  private watchers: Watcher[] = [];
  private cursorPosition = 0;
  private selectionStart = -1;
  private selectionEnd = -1;
  private plugins: IPlugin[] = [hePlugin, cursorPlugin];

  constructor(private base: string, watcher?: Watcher) {
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
    //
    // for (const index in [...this.text]) {
    //   const letter = this.text[index];
    //   const encoded = he.encode(letter);
    //   const diff = encoded.length - letter.length;
    //
    //   if (+index < this.cursorPosition) {
    //     cursorPosition += diff;
    //   }
    //   if (+index < this.selectionStart) {
    //     selectionStart += diff;
    //   }
    //   if (+index <= this.selectionEnd) {
    //     selectionEnd += diff;
    //   }
    //
    //   text += encoded;
    // }

    for (const plugin of this.plugins) {
      const result = plugin(text, {
        cursorPosition,
        selectionStart,
        selectionEnd,
      });
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
    }

    for (const watcher of this.watchers) {
      watcher({
        text,
        originalText: this.text,
        base: this.base,
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
