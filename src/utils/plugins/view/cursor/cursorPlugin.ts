import { IPlugin } from "../../../../dtos/IPlugin";

const addCursor = (text: string): string => {
  return text + '<span class="editor_cursor"></span>';
};

export const cursorPlugin: IPlugin = (text, options, originalText) => {
  const cursorPosition =
    typeof options.cursorPosition !== "undefined" ? options.cursorPosition : -1;
  const selectionStart =
    typeof options.selectionStart !== "undefined" ? options.selectionStart : -1;
  const selectionEnd =
    typeof options.selectionEnd !== "undefined" ? options.selectionEnd : -1;

  let cursorAdded = false;
  let newText = "";
  for (const i in [...text]) {
    if (+i === cursorPosition && !cursorAdded) {
      newText = addCursor(newText);
      cursorAdded = true;
    }

    if (+i === selectionStart) {
      newText += '<span class="editor_selection">';
    }
    if (+i === selectionEnd) {
      newText += "</span>";
    }
    newText += text[i];
  }

  if (!cursorAdded) {
    newText = addCursor(newText);
  }

  return {
    text: newText,
    options,
    originalText,
  };
};
