import { deleteSelection } from "./deleteSelection";
import { sliceText } from "./sliceText";

import { IPlugin } from "../../../dtos/IPlugin";
import { KeyboardListener } from "../../keyboardListener";
import { EditorPluginsManager } from "../EditorPluginsManager";

const TAB_SIZE = 2;

export const registerKeyboardPlugin = (manager: EditorPluginsManager) => {
  const listener = KeyboardListener.getInstance();

  listener.on("tab", [], () => {
    manager.update(addTabsPlugin);
  });

  listener.on("tab", [["shift"]], () => {
    manager.update(removeTabsPlugin);
  });

  listener.on("enter", [], () => {
    manager.update(addEnterPlugin);
  });
};

const addEnterPlugin: IPlugin = (text, options, originalText) => {
  const [_start, _end] = sliceText(
    originalText,
    options.selectionStart,
    options.selectionEnd
  );

  let __end = _end;

  const startLines = _start.split("\n");
  const startLastLine = startLines[startLines.length - 1];
  let spaces = 0;
  for (const l of startLastLine.split("")) {
    if (l === " ") {
      spaces++;
    } else {
      break;
    }
  }

  if (startLastLine.endsWith("{") || startLastLine.endsWith("[")) {
    __end = `\n${" ".repeat(spaces)}${_end}`;
    spaces += TAB_SIZE;
  }

  const newText = [_start, `\n${" ".repeat(spaces)}`, __end].join("");

  return {
    text: newText,
    options: {
      ...options,
      cursorPosition: options.cursorPosition + spaces + 1,
    },
    originalText: newText,
  };
};

const removeTabsPlugin: IPlugin = (text, options, originalText) => {
  const position = options.cursorPosition;
  const lines = originalText.split("\n");

  let done = false;
  let i = -1;
  let toDelete = 0;
  let minCursorPosition = 0;

  const newText = lines
    .map((line) => {
      if (done) {
        return line;
      }
      minCursorPosition = i;
      i++;
      const letters = line.split("");
      let currentLine = false;

      for (const letter of letters) {
        i++;
        if (i === position) {
          currentLine = true;
          break;
        }
      }

      if (currentLine) {
        let spaces = 0;
        done = true;
        for (const letter of letters) {
          if (letter === " ") {
            spaces++;
          } else {
            break;
          }
        }

        const spacesCountToDelete = spaces > TAB_SIZE ? TAB_SIZE : spaces;
        if (spacesCountToDelete > 0) {
          toDelete = spacesCountToDelete;
          return line.replace(" ".repeat(spacesCountToDelete), "");
        }
      }
      return line;
    })
    .join("\n");

  const newCursorPosition = options.cursorPosition - toDelete;

  return {
    text: newText,
    options: {
      ...options,
      cursorPosition:
        newCursorPosition < minCursorPosition
          ? minCursorPosition
          : newCursorPosition,
    },
    originalText: newText,
  };
};

const addTabsPlugin: IPlugin = (text, options, originalText) => {
  const position = options.cursorPosition;
  const selectionEnd = options.selectionEnd;

  const _originalText = deleteSelection(originalText, position, selectionEnd);

  const lines = _originalText.split("\n");

  let i = -1;
  let needToInsert = 0;
  let done = false;

  const newText = lines
    .map((line) => {
      if (done) {
        return line;
      }
      i++;
      const letters = line.split("");
      let positionInLine = -1;
      const newLine = letters.map((l) => {
        if (done) {
          return l;
        }
        positionInLine++;
        needToInsert = TAB_SIZE - (positionInLine % TAB_SIZE);

        if (i === position) {
          done = true;
          i++;
          return `${" ".repeat(needToInsert)}${l}`;
        }

        i++;

        return l;
      });

      return newLine.join("");
    })
    .join("\n");

  return {
    text: newText,
    options: {
      ...options,
      cursorPosition: options.cursorPosition + needToInsert,
    },
    originalText: newText,
  };
};
