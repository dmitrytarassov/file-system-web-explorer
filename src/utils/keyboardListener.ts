import { VoidFn } from "../dtos/common";

export class KeyboardListener {
  static instance: KeyboardListener;

  listeners: Map<string, Set<VoidFn>> = new Map();

  constructor() {
    window.addEventListener("keydown", (e) => {
      const meta: string[] = [];
      if (e.ctrlKey) {
        meta.push("ctrl");
      }
      if (e.metaKey) {
        meta.push("command");
      }
      if (e.shiftKey) {
        meta.push("shift");
      }
      if (e.altKey) {
        meta.push("alt");
      }

      const letter = e.key || e.code;

      const listeners = this.getListeners(letter, meta);

      if (listeners.size > 0) {
        e.preventDefault();
        e.stopPropagation();

        listeners.forEach((listener) => {
          listener();
        });
      }
    });
  }

  static getInstance(): KeyboardListener {
    if (!KeyboardListener.instance) {
      KeyboardListener.instance = new KeyboardListener();
    }

    return KeyboardListener.instance;
  }

  on(key: string, options: string[][] = [], fn: VoidFn) {
    if (options.length) {
      for (const _options of options) {
        const listeners = this.getListeners(key, _options);

        if (!listeners.has(fn)) {
          listeners.add(fn);
        }
      }
    } else {
      const listeners = this.getListeners(key, []);

      if (!listeners.has(fn)) {
        listeners.add(fn);
      }
    }
  }

  off(key: string, options: string[][], fn: VoidFn) {
    if (options.length) {
      for (const _options of options) {
        const listeners = this.getListeners(key, _options);

        if (listeners.has(fn)) {
          listeners.delete(fn);
        }
      }
    } else {
      const listeners = this.getListeners(key, []);

      if (listeners.has(fn)) {
        listeners.delete(fn);
      }
    }
  }

  private getListeners(key: string, options: string[]): Set<VoidFn> {
    const keyName = this.getKeyName(key, options);

    const _listeners = this.listeners.get(keyName);

    if (_listeners) {
      return _listeners;
    }

    const listeners = new Set<VoidFn>();
    this.listeners.set(keyName, listeners);
    return listeners;
  }

  private getKeyName(key: string, options: string[]): string {
    return `${options
      .sort((a, b) => (a > b ? 1 : -1))
      .join("_")}_${key}`.toLowerCase();
  }
}
