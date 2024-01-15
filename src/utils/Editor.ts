import { EditorPluginsManager } from "./plugins/EditorPluginsManager";
import { registerKeyboardPlugin } from "./plugins/common/keyboardPlugin";
import { mdPreviewPlugin } from "./plugins/md/mdPreviewPlugin";
import { hePlugin } from "./plugins/view/highlight/hePlugin";

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
  private selectionStart = -1;
  private selectionEnd = -1;
  private plugins: IPlugin[] = [hePlugin, mdPreviewPlugin];
  private pluginsManager: EditorPluginsManager;
  private field: HTMLTextAreaElement | undefined;

  constructor(
    public readonly base: string,
    private language: string,
    watcher?: Watcher
  ) {
    this.pluginsManager = new EditorPluginsManager(this);
    this.pluginsManager.addPlugin(registerKeyboardPlugin);

    this.text = base;
    this.setSelection();

    if (watcher) {
      this.watchers.push(watcher);
      this.update();
    }
  }

  public updateText(value: string, cursorPosition: number) {
    this.setSelection(cursorPosition, cursorPosition);
    this.text = value;
    this.setSelection(undefined, undefined);
    this.update();
  }

  public restore() {
    this.text = this.base;
    this.update();
  }

  public update(plugins?: IPlugin[]) {
    let text = this.text;
    let cursorPosition = this.cursorPosition;
    let selectionStart = this.selectionStart;
    let selectionEnd = this.selectionEnd;
    let preview: string | undefined;
    let originalText = text;

    const _plugins = plugins ? [...plugins, ...this.plugins] : this.plugins;

    for (const plugin of _plugins) {
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
      originalText = result.originalText;
      text = result.text;
      cursorPosition = result.options.cursorPosition;
      selectionStart = result.options.selectionStart;
      selectionEnd = result.options.selectionEnd;

      preview = result.previewText;
    }

    for (const watcher of this.watchers) {
      watcher({
        text,
        originalText,
        base: this.base,
        preview,
      });
    }
    this.text = originalText;

    this.setSelection(cursorPosition, cursorPosition);

    setTimeout(() => {
      if (plugins?.length && this.field) {
        this.field.value = originalText;
        this.field.setSelectionRange(this.cursorPosition, this.cursorPosition);
      }
    }, 0);
  }

  get cursorPosition() {
    return this.selectionStart;
  }

  public setSelection(
    start: number | undefined = 0,
    end: number | undefined = 0
  ) {
    this.selectionStart = start;
    this.selectionEnd = end;
  }

  setField(field?: HTMLTextAreaElement) {
    this.field = field;
  }
}
